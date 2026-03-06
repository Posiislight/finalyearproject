import sys
import os
import django

sys.path.append(r'c:\Users\adele\finalyearproject\backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_project.settings')
django.setup()

from employers_jobs.serializers import JobPostSerializer
data = {
    'title': 'Test',
    'description': 'desc',
    'salaryCurrency': 'USD',
    'salaryMin': '1',
    'salaryMax': '2',
    'salary': 'USD 1 - 2',
    'status': 'open',
    'location': 'Remote',
    'requirements': 'req'
}
s = JobPostSerializer(data=data)
print('Valid?', s.is_valid())
print('Errors:', s.errors)
