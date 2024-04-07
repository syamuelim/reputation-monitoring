from rest_framework import serializers
from .models import *
class ReputationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reputation
        fields = '__all__'
        db_table = 'reputation'
        
class YoutubeResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = YoutubeResponse
        fields = '__all__'
        db_table = 'youtube_channel_response'      
           
class InstagramResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstagramResponse
        fields = '__all__'
        db_table = 'instagram_response' 
