from django.urls import path
from . import views

urlpatterns = [
    path('reputation/', views.reputation_list, name='reputation'),
]