from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from users.models import JobSeekerProfile, EmployerProfile
from employers_jobs.models import JobPost
from job_seekers.models import JobApplication
from messaging.models import Thread, Message
from faker import Faker
import random

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the database with Dummy Data for testing'

    def handle(self, *args, **kwargs):
        fake = Faker()
        Faker.seed(42)

        self.stdout.write('Clearing existing data...')
        Message.objects.all().delete()
        Thread.objects.all().delete()
        JobApplication.objects.all().delete()
        JobPost.objects.all().delete()
        EmployerProfile.objects.all().delete()
        JobSeekerProfile.objects.all().delete()
        User.objects.exclude(is_superuser=True).delete() # Keep superusers

        self.stdout.write('Creating Mock Users...')
        
        # Create Job Seekers
        job_seekers = []
        for i in range(10):
            user = User.objects.create_user(
                username=fake.user_name(),
                email=fake.email(),
                password='password123',
                is_job_seeker=True
            )
            JobSeekerProfile.objects.create(
                user=user,
                bio=fake.text(max_nb_chars=200),
                location=fake.city() + ', ' + fake.country(),
            )
            job_seekers.append(user)

        # Create Employers
        employers = []
        for i in range(5):
            user = User.objects.create_user(
                username=fake.user_name(),
                email=fake.email(),
                password='password123',
                is_employer=True
            )
            EmployerProfile.objects.create(
                user=user,
                company_name=fake.company(),
                bio=fake.catch_phrase(),
                location=fake.city() + ', ' + fake.country(),
            )
            employers.append(user)

        self.stdout.write('Creating Mock Job Posts...')
        job_posts = []
        for employer in employers:
            # Each employer posts 1 to 3 jobs
            for _ in range(random.randint(1, 3)):
                post = JobPost.objects.create(
                    employer=employer,
                    title=fake.job(),
                    description=fake.paragraphs(nb=3),
                    requirements=fake.text(max_nb_chars=200),
                    salary=f"${random.randint(50, 150)}k - ${random.randint(151, 250)}k",
                    location=fake.city() + ', ' + fake.country(),
                    status=random.choice(['open', 'open', 'open', 'draft', 'closed'])
                )
                job_posts.append(post)

        self.stdout.write('Creating Mock Job Applications...')
        for seeker in job_seekers:
            # Each seeker applies to 1 to 5 jobs
            sampled_jobs = random.sample(job_posts, random.randint(1, 4))
            for job in sampled_jobs:
                JobApplication.objects.create(
                    job_seeker=seeker,
                    job_post=job,
                    status=random.choice(['applied', 'reviewing', 'interviewing', 'rejected']),
                    cover_letter=fake.text(max_nb_chars=400)
                )

        self.stdout.write('Creating Mock Messaging Threads...')
        for seeker in job_seekers[:5]: # just the first 5 seekers
            employer = random.choice(employers)
            thread, created = Thread.objects.get_or_create(
                job_seeker=seeker,
                employer=employer
            )
            for _ in range(random.randint(1, 4)):
                Message.objects.create(
                    thread=thread,
                    sender=random.choice([seeker, employer]),
                    content=fake.sentence()
                )

        self.stdout.write(self.style.SUCCESS('Successfully seeded database with dummy data.'))
