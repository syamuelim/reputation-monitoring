from django.db import models

# Create your models here.
class Reputation(models.Model):
    kol_id = models.IntegerField()
    rating = models.FloatField()
    status = models.CharField(max_length=128)
    reputation_at = models.DateTimeField()
    created_at = models.DateTimeField()
    class Meta:
        db_table = 'reputation'
        
class YoutubeResponse(models.Model):
    youtube_channel_id = models.IntegerField()
    response = models.TextField()
    created_at = models.DateTimeField()
    class Meta:
        db_table = 'youtube_channel_response' 
        
class InstagramResponse(models.Model):
    instagram_id = models.IntegerField()
    response = models.TextField()
    created_at = models.DateTimeField()
    class Meta:
        db_table = 'instagram_response' 