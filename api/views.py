from .serializers import TeamCreateSerializer, TeamListSerializer, MatchDataSerializer, TeamUpdateSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Team, MatchPair
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from django.core.paginator import Paginator
from rest_framework.parsers import JSONParser
import json
with open('E:/hackdemo/leaderboard/api/teamsdata.json') as f:
    teamsdata = json.load(f)
# Create your views here.

# Class based view for creating a team.


class TeamCreateView(generics.CreateAPIView):
    serializer_class = TeamCreateSerializer

# Class based view for retrieving teams data.


class TeamListView(generics.ListAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamListSerializer

# Class based view for retrieving single team data based on team name,
# but not used in the project because material-table from material-ui took care of it.


@api_view(['GET'])
def TeamGetView(request, pk):
    try:
        queryset = Team.objects.get(pk=pk)
    except Team.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer_class = TeamListSerializer(queryset)
    return Response(serializer_class.data, status=status.HTTP_200_OK)

# Inserting data into database.
@api_view(['GET'])
def InsertData(request):
    try:
        
        for i in teamsdata:
            queryset = Team.objects.all()
            print(i)
            serializer_obj = TeamListSerializer(i)
            print(serializer_obj)
            if serializer_obj.is_valid():
                serializer_obj.add()
                response_data = {
                'team_name': "asdklf",
                
            }
        return Response(response_data,status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

# Class based view for retrieving single team data based on score,
# but not used in the project because material-table from material-ui took care of it.

@api_view(['GET'])
def GetScoreView(request, score):
    try:
        queryset = Team.objects.filter(score=score)
    except Team.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer_class = TeamListSerializer(queryset, many=True)
    paginate_by = 20
    return Response(serializer_class.data, status=status.HTTP_200_OK)

# Function based view for deleting single team data based on team name.

@api_view(['DELETE'])
def TeamDeleteView(request, pk):
    try:
        obj = Team.objects.get(pk=pk)
    except Team.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    obj.delete()
    return Response(status=status.HTTP_200_OK)

# Class based view for updating the teams score.


class TeamUpdateView(APIView):
    def put(self, request):
        try:
            teamobj = Team.objects.get(pk=request.data['team_name'])
        except Team.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        data = {'score': teamobj.score + request.data['score']}
        serializer_obj = TeamListSerializer(teamobj, data=data, partial=True)
        if serializer_obj.is_valid():
            serializer_obj.save()
            response_data = {
                'team_name': request.data['team_name'],
                'score': data['score']
            }
            return Response(response_data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_MODIFIED)

# Class based generic view for saving the match details.


class MatchCreateView(generics.CreateAPIView):
    serializer_class = MatchDataSerializer
