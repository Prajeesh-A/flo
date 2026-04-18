#!/usr/bin/env bash
# exit on error
set -o errexit

# Run migrations (DB is available at runtime)
python manage.py migrate

# Create superuser from env vars (idempotent)
python manage.py init_admin

# Populate missing production data (idempotent - skips existing data)
python manage.py populate_production_data

# Start the application server
gunicorn floneo_backend.wsgi:application
