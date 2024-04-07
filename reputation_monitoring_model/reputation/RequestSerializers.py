from rest_framework import serializers
class ReputationCreateRequestSerializer(serializers.Serializer):
    kolId = serializers.IntegerField()
    youtubeResponseId = serializers.IntegerField()
    class Meta:
        fields = '__all__'
        
        
