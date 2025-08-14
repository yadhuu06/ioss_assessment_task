
from django.db import models
import string
import random

def generate_short_code():
    """Generate a random 6-character short code."""
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(6))

class ShortUrl(models.Model):
    """Model to store original and shortened URLs."""
    original_url = models.URLField(max_length=2000)
    short_code = models.CharField(max_length=6, unique=True, default=generate_short_code)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.short_code} -> {self.original_url}"