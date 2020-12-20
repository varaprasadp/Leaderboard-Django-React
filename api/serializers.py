from rest_framework import serializers
from .models import Team,MatchPair

#Serializer for creating Team
class TeamCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('team_name',)

#Serializer for retrieving Team
class TeamListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('__all__')

#Serializer for updating score
class TeamUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('score',)

#Serializer for Match Pair data
class MatchDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatchPair
        fields = ('team1','team2')
