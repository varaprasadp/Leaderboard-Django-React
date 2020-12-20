from django.db import models

# Create your models here.
class Team(models.Model):
    team_name = models.CharField(max_length = 30,primary_key=True)
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    ties = models.IntegerField(default=0)
    score = models.IntegerField(default=0)
    class Meta:
        ordering = ["-score"]

class MatchPair(models.Model):
    match_id =models.AutoField(primary_key=True)
    team1 = models.CharField(max_length = 30)
    team2 = models.CharField(max_length = 30)