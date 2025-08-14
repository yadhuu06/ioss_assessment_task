from rest_framework import serializers
from .models import ShortUrl

class ShortUrlSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShortUrl
        fields = ['original_url', 'short_code']