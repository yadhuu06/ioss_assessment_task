from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404, redirect
from .models import ShortUrl
from .serializers import ShortUrlSerializer

class ShortenUrlView(APIView):
    """API to shorten a given URL."""
    def post(self, request):
        serializer = ShortUrlSerializer(data=request.data)
        if serializer.is_valid():
            original_url = serializer.validated_data['original_url']
            existing_url = ShortUrl.objects.filter(original_url=original_url).first()
            if existing_url:
                return Response({
                    'short_code': existing_url.short_code,
                    'short_url': request.build_absolute_uri(f'/{existing_url.short_code}/')  
                }, status=status.HTTP_200_OK)
            short_url = serializer.save()
            return Response({
                'short_code': short_url.short_code,
                'short_url': request.build_absolute_uri(f'/{short_url.short_code}/')  
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class RedirectUrlView(APIView):
    """Redirect from short code to original URL."""
    def get(self, request, short_code):
        short_url = get_object_or_404(ShortUrl, short_code=short_code)
        return redirect(short_url.original_url)