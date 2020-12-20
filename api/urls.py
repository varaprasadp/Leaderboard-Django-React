"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from .views import TeamListView, InsertData, TeamCreateView, TeamUpdateView, TeamDeleteView, MatchCreateView, TeamGetView, GetScoreView
urlpatterns = [
    # api url for retrieving  all teams data.
    path('teams', TeamListView.as_view()),

    # api for inserting data into database.
    path('teamsInsert', InsertData),

    # api url for updating teams score.
    path('teamUpdate', TeamUpdateView.as_view()),

    # api url for creating a team.
    path('team', TeamCreateView.as_view()),

    # api url for deleting the team.
    path('team/<pk>', TeamDeleteView),

    # api url for retrieving single team data based on team name,
    # but not used in the project because material-table from material-ui took care of it.
    path('getteam/<pk>', TeamGetView),

    # api url for retrieving teams data based on score,
    # but not used in the project because material-table from material-ui took care of it.
    path('getTeamScore/<int:score>', GetScoreView),

    # api url for inserting match data.
    path('match', MatchCreateView.as_view()),
]
