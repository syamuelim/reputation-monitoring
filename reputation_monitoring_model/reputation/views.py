from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
from .RequestSerializers import *
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from datetime import datetime

@swagger_auto_schema(
    method='post',
    request_body=ReputationCreateRequestSerializer
)
@api_view(['POST'])
def reputation_list(request):
    kol_id = request.data.get('kolId')
    youtube_response_id = request.data.get('youtubeResponseId')
    # get the youtube comments data json
    # remarks: 
    #   1. the json data can be retrieved by youtube_response_serializer.data.get('response')
    #   2. the record fetch time can be retrieved by youtube_response_serializer.data.get('createdAt')
    #   3. the json data is stringified, you may need to parse the data before use
    youtube_response = YoutubeResponse.objects.get(pk = youtube_response_id)
    youtube_response_serializer = YoutubeResponseSerializer(youtube_response)
    
    # TODO generate the reputation
    reputation_score = 5
    
    # save the reputation data to db
    reputation_result = Reputation.objects.create( kol_id=kol_id, rating = reputation_score, status ="ACTIVE", reputation_at= datetime.now(), created_at= datetime.now())
    reputation_result.save()
    return Response(status=status.HTTP_201_CREATED)