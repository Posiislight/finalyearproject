import os
import sys
import django
import json
import traceback

sys.path.append(r'c:\Users\adele\finalyearproject\backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_project.settings')
django.setup()

from employers_jobs.views import JobPostViewSet
from rest_framework.test import APIRequestFactory
from django.contrib.auth import get_user_model

User = get_user_model()
employer = User.objects.filter(is_employer=True).first()

if employer:
    factory = APIRequestFactory()
    payload = {
        'title': 'Test Title',
        'description': 'Test Description',
        'requirements': 'Test Req',
        'location': 'Remote',
        'salaryCurrency': 'USD',
        'salaryMin': '500',
        'salaryMax': '1000',
        'salary': 'USD 500 - 1000',
    }
    request = factory.post('/api/v1/employers/jobs/', payload, format='json')
    request.user = employer
    
    view = JobPostViewSet.as_view({'post': 'create'})
    try:
        response = view(request)
        print("STATUS:", response.status_code)
        print("DATA:", response.data)
    except Exception as e:
        print("EXCEPTION RAISED:")
        traceback.print_exc()
else:
    print("No employer found")
