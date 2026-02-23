#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --noinput

# Run migrations
python manage.py migrate

# Create superuser from env vars
python manage.py init_admin

# Populate missing production data (idempotent - skips existing data)
python manage.py populate_production_data
