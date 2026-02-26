from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import JobFeedViewSet, JobApplicationViewSet, DismissJobView

router = DefaultRouter()
router.register(r'jobs', JobFeedViewSet, basename='jobfeed')
router.register(r'applications', JobApplicationViewSet, basename='jobapplication')

urlpatterns = [
    path('', include(router.urls)),
    path('dismiss-job/', DismissJobView.as_view(), name='dismiss-job'),
]

