import time
import logging

logger = logging.getLogger('api_request_logger')

class APILoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith('/api/'):
            start_time = time.time()
            response = self.get_response(request)
            duration = time.time() - start_time
            logger.info(f"[{request.method}] {request.path} | Status: {response.status_code} | Time: {duration*1000:.2f}ms")
            return response
        
        return self.get_response(request)
