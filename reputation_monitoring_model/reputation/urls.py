from django.urls import path
from . import views

urlpatterns = [
    path('reputation/category', views.category, name='category'),
    path('reputation/sentiment', views.sentiment, name='sentiment'),
    path('reputation/channel', views.channel, name='channel'),
]