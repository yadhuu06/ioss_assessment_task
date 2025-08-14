from django.urls import path
from . import views

app_name = 'url_shortener'

urlpatterns = [
    path('shorten/', views.ShortenUrlView.as_view(), name='shorten_url'),
    path('<str:short_code>/', views.RedirectUrlView.as_view(), name='redirect_url'),
]