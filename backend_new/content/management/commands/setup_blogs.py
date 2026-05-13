from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils import timezone
from django.utils.text import slugify
from content.models import BlogPost, BlogCategory, BlogTag


BLOG_1_CONTENT = """
<h2>Mid-sized organizations are the unsung heroes of the economy—dynamic, innovative, and perfectly positioned to outmaneuver larger competitors.</h2>

<p>Yet, they often grapple with a unique challenge: the "resource squeeze." Too big for manual processes, but often too lean to invest in massive IT teams or custom-built software for every need.</p>

<p>Enter Floneo Low-Code/No-Code (LCNC), a game-changer that isn't just a trend, but a strategic imperative for mid-market success. Floneo LCNC isn't about replacing your IT department; it's about empowering your entire organization to build, innovate, and thrive.</p>

<p>Let's dive into how Floneo LCNC acts as a true superpower for mid-sized firms.</p>

<h2>1. Smashing the IT Bottleneck: Empowering the "Citizen Developer"</h2>

<p>Imagine your marketing team needing a new lead tracking system, or HR wanting a streamlined onboarding portal. In many mid-sized firms, these requests get added to a backlog, leading to weeks or even months of waiting for a small, overwhelmed IT department.</p>

<p>Floneo LCNC changes this narrative. It provides intuitive, drag-and-drop tools that allow non-technical business users (your "citizen developers") to build robust applications themselves. This frees up your core IT team to focus on critical infrastructure, security, and strategic projects, while business units can rapidly create the tools they need to be more efficient.</p>

<h2>2. Cost-Effective Innovation: Building More for Less</h2>

<p>Hiring skilled software developers is fiercely competitive and expensive. For mid-sized companies, competing with tech giants for talent can be a losing battle. Floneo LCNC democratizes development.</p>

<p>By enabling existing staff to create powerful applications, Floneo significantly reduces the need for costly external consultants or expanding your in-house development team. You can build bespoke solutions that perfectly fit your unique workflows, often at a fraction of the cost of off-the-shelf software subscriptions or traditional custom development. This means more innovation, without breaking the bank.</p>

<h2>3. Accelerated Digital Transformation: From Idea to Impact, Faster</h2>

<p>The business world moves at lightning speed. Waiting 6–12 months for a new application to be developed means missing opportunities or falling behind competitors. Agility is key for mid-market growth.</p>

<p>Floneo LCNC dramatically slashes development timelines. You can move from a concept to a fully functional application in weeks, not months. This rapid iteration allows your organization to quickly adapt to market changes, launch new services, or automate critical processes, ensuring you stay nimble and responsive. Imagine being able to roll out a new customer portal or an internal efficiency tool almost overnight!</p>

<h2>4. Connecting the Dots: Unifying Siloed Data</h2>

<p>Many mid-sized businesses operate with a patchwork of disparate systems—a CRM here, an accounting system there, a logistics platform somewhere else. This creates data silos, hindering a holistic view of the business and leading to manual, error-prone data entry.</p>

<p>Floneo LCNC acts as the "connective tissue" for your tech stack. With pre-built connectors and robust integration capabilities, it can pull data from various sources into a single, unified platform. This provides real-time insights, automates data flow, and gives leaders a clear, comprehensive picture of their operations, enabling better, faster decisions.</p>

<h2>5. Future-Proofing with Integrated AI</h2>

<p>The future is intelligent, and Floneo LCNC is built for it. Integrating AI capabilities directly into the platform means mid-sized companies can leverage advanced technology without needing a team of AI specialists.</p>

<p>You can easily embed "smart" features into your applications – think automated document summaries, predictive analytics for inventory management, or intelligent chatbots for customer service. This ensures your organization remains at the forefront of technological innovation, gaining a competitive edge by making smarter, data-driven operational choices.</p>

<h2>The Bottom Line: Agility, Efficiency, and Growth</h2>

<p>For mid-sized organizations, Floneo LCNC isn't just another tool, it's a strategic partner for growth. It empowers your people, optimizes your processes, and accelerates your journey towards true digital transformation. By breaking down technical barriers and fostering a culture of innovation, Floneo LCNC helps you do more with less, react faster to change, and ultimately, secure your place as a leader in your industry.</p>

<p><strong>Ready to unlock your organization's full potential? Explore how Floneo LCNC can transform your mid-sized business today!</strong></p>
""".strip()


BLOG_2_CONTENT = """
<h2>Low-Code/No-Code (LCNC) has gone from a niche concept to a mainstream necessity.</h2>

<p>Businesses worldwide are leveraging LCNC to accelerate digital transformation. But with so many platforms on the market, how do you choose the right one?</p>

<p>At Floneo, we believe LCNC should be more than just simple app building. It should be powerful, secure, flexible, and truly transformative. That's why Floneo LCNC merges the best of traditional LCNC with the demands of the Next Generation – creating a platform that consistently stands out.</p>

<p>Here's what sets Floneo LCNC apart:</p>

<h2>1. Intuitive UI: Simplicity Meets Sophistication</h2>

<p>Many LCNC platforms promise ease of use, but Floneo delivers a genuinely delightful experience. Our user interface is meticulously designed to be simple and intuitive, making complex application development accessible to everyone, from seasoned developers to first-time citizen developers. It's about clarity, not clutter, allowing you to focus on your ideas, not the tools.</p>

<h2>2. Powerhouse Backend: The 24,000 Business Logic Matrix</h2>

<p>Beneath our simple drag-and-drop front-end lies an incredibly robust backend. Floneo offers an unparalleled 24,000-strong business logic matrix. This means you can design, automate, and integrate virtually any complex business process imaginable, all without writing a single line of traditional code. It's the difference between building a simple form and constructing an entire, intelligent enterprise workflow.</p>

<h2>3. Database Access, No SQL Skills Required</h2>

<p>Managing data can be intimidating, especially without SQL expertise. Floneo eliminates this barrier. Our platform provides intuitive, visual tools to interact with databases, allowing you to define data models, create relationships, and manage information effectively – all without needing specialized database language skills. This truly democratizes data management within your applications.</p>

<h2>4. Developer Mode: True Exit Strategy &amp; Flexibility</h2>

<p>This is where Floneo truly shines as a "Next Generation" LCNC platform. We understand that business needs evolve. Our unique Developer Mode allows you to download the actual underlying code of your built applications. This provides an invaluable exit strategy, ensuring you're never locked into our platform. It also offers unparalleled flexibility for developers who want to extend, customize, or deploy applications in bespoke environments. Your investment in building is truly yours.</p>

<h2>5. Simple, Clear Pricing Model: No Hidden Surprises</h2>

<p>We believe in transparency. Floneo avoids the convoluted, tiered pricing models that often leave customers scratching their heads. Our pricing is straightforward and easy to understand, allowing you to budget effectively without fear of hidden costs or unexpected escalations as your usage grows.</p>

<h2>6. Multi-Language Support: Global Reach, Local Feel</h2>

<p>In today's global economy, multi-language support isn't a luxury, it's a necessity. Floneo proudly supports Arabic, Spanish, German, and English, among others. This ensures your applications can cater to diverse user bases, fostering inclusivity and expanding your operational reach effortlessly.</p>

<h2>7. Uncompromising Security &amp; Compliance</h2>

<p>Security isn't an afterthought at Floneo, it's fundamental. Our platform is built to meet and exceed stringent security criteria and regulatory compliances, protecting your data and applications from the ground up. You can build and deploy with confidence, knowing your solutions adhere to the highest industry standards.</p>

<h2>8. Advanced Business Operation Automation Engine</h2>

<p>Beyond just building apps, Floneo empowers true business transformation with its integrated Business Operation Automation Engine. This engine allows you to orchestrate complex workflows, automate repetitive tasks, and streamline entire operational processes across departments, leading to significant efficiency gains and reduced operational costs.</p>

<h2>9. Continuous Innovation &amp; Improvements: Always Ahead</h2>

<p>The digital landscape is constantly evolving, and so is Floneo. We are committed to continuous innovation, regularly introducing new features, enhancements, and performance improvements. This ensures that Floneo LCNC remains at the cutting edge, providing you with a future-proof platform that grows with your business needs.</p>

<h2>Floneo: Where Traditional LCNC Meets the Future</h2>

<p>Floneo LCNC isn't just about building applications faster; it's about building better, more intelligent, and more flexible applications that truly drive business value. By combining extreme ease of use with enterprise-grade power, unmatched flexibility, and a commitment to continuous advancement, Floneo is redefining what an LCNC platform can achieve.</p>

<p><strong>Ready to experience the next generation of LCNC? Discover how Floneo can transform your business today!</strong></p>
""".strip()


class Command(BaseCommand):
    help = 'Delete demo blogs and add real Floneo blog posts'

    def handle(self, *args, **options):
        # ── 1. Delete all existing (demo) blogs ──────────────────────────────
        deleted_count, _ = BlogPost.objects.all().delete()
        self.stdout.write(self.style.WARNING(f'Deleted {deleted_count} existing blog post(s).'))

        # ── 2. Ensure author exists ───────────────────────────────────────────
        author = User.objects.filter(is_superuser=True).first()
        if not author:
            author = User.objects.first()
        if not author:
            # Create a system author so blogs can always be created
            import os
            username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'floneo_admin')
            email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@floneo.co')
            password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'floneo@2025!')
            author = User.objects.create_superuser(username=username, email=email, password=password)
            self.stdout.write(self.style.SUCCESS(f'Created system author: {username}'))

        # ── 3. Ensure categories exist ────────────────────────────────────────
        lcnc_cat, _ = BlogCategory.objects.get_or_create(
            slug='lcnc-platform',
            defaults={
                'name': 'LCNC Platform',
                'description': 'Insights and updates about Low-Code/No-Code development',
                'color': '#6366F1',
                'is_active': True,
                'order': 1,
            }
        )
        business_cat, _ = BlogCategory.objects.get_or_create(
            slug='business-transformation',
            defaults={
                'name': 'Business Transformation',
                'description': 'How technology drives business growth and innovation',
                'color': '#10B981',
                'is_active': True,
                'order': 2,
            }
        )

        # ── 4. Ensure tags exist ──────────────────────────────────────────────
        tag_names = ['LCNC', 'Automation', 'Digital Transformation', 'Mid-Market', 'AI', 'No-Code', 'Low-Code', 'Enterprise']
        tags = {}
        for name in tag_names:
            slug = slugify(name)
            tag, _ = BlogTag.objects.get_or_create(slug=slug, defaults={'name': name, 'is_active': True})
            tags[name] = tag

        # ── 5. Create Blog 1 ──────────────────────────────────────────────────
        blog1 = BlogPost.objects.create(
            title='Unlocking Agility: How Floneo LCNC Becomes the Mid-Market Superpower',
            slug='floneo-lcnc-mid-market-superpower',
            excerpt=(
                'Mid-sized organizations face the "resource squeeze"—too big for manual processes, '
                'too lean for massive IT investment. Discover how Floneo LCNC is the strategic '
                'superpower that empowers mid-market firms to build, automate, and thrive.'
            ),
            content=BLOG_1_CONTENT,
            author=author,
            status='published',
            published_at=timezone.now(),
            category=business_cat,
            meta_title='How Floneo LCNC Empowers Mid-Market Organizations',
            meta_description=(
                'Discover how Floneo Low-Code/No-Code platform helps mid-sized businesses overcome '
                'the IT bottleneck, reduce costs, and accelerate digital transformation.'
            ),
            meta_keywords='floneo, LCNC, mid-market, low-code, no-code, digital transformation, automation',
            is_featured=True,
            reading_time=5,
        )
        blog1.tags.set([tags['LCNC'], tags['Low-Code'], tags['No-Code'], tags['Digital Transformation'], tags['Mid-Market'], tags['AI']])
        self.stdout.write(self.style.SUCCESS(f'[OK] Created Blog 1: "{blog1.title}"'))

        # ── 6. Create Blog 2 ──────────────────────────────────────────────────
        blog2 = BlogPost.objects.create(
            title='Beyond the Buzz: What Makes Floneo LCNC Truly Outstanding?',
            slug='what-makes-floneo-lcnc-outstanding',
            excerpt=(
                'With so many LCNC platforms on the market, what truly sets Floneo apart? '
                'From a 24,000-strong business logic matrix to developer mode with full code export, '
                'discover the 9 features that make Floneo the next-generation LCNC platform.'
            ),
            content=BLOG_2_CONTENT,
            author=author,
            status='published',
            published_at=timezone.now(),
            category=lcnc_cat,
            meta_title='What Makes Floneo LCNC Platform Outstanding?',
            meta_description=(
                'Explore the 9 unique features that set Floneo LCNC apart: intuitive UI, '
                '24,000 business logic blocks, developer mode, multi-language support, and more.'
            ),
            meta_keywords='floneo, LCNC, low-code, no-code, platform features, automation, enterprise security',
            is_featured=True,
            reading_time=6,
        )
        blog2.tags.set([tags['LCNC'], tags['Low-Code'], tags['No-Code'], tags['Automation'], tags['Enterprise'], tags['AI']])
        self.stdout.write(self.style.SUCCESS(f'[OK] Created Blog 2: "{blog2.title}"'))

        self.stdout.write(self.style.SUCCESS('\nBlogs setup complete! 2 blogs published.'))
