import requests
from rest_framework import viewsets
from django.http import JsonResponse
from .models import Artist, Album, Show, Set, Venue
from .serializers.artist import ArtistSerializer
from .serializers.album import AlbumSerializer
from .serializers.venue import VenueSerializer
from .serializers.show import ShowSerializer
from .serializers.set import SetSerializer

class ArtistListView(viewsets.ModelViewSet):
  serializer_class = ArtistSerializer
  queryset = Artist.objects.all()
  filterset_fields = (
    'id',
    'sets__show__id',
  )
  search_fields = ( 
    'name', 
    'abbreviation',
  )

class AlbumListView(viewsets.ModelViewSet):
  serializer_class = AlbumSerializer
  queryset = Album.objects.all()
  filterset_fields = (
    'artist__id',
  )
  search_fields = ( 
      'name', 
      'artist__name',
  )

class VenueListView(viewsets.ModelViewSet):
  serializer_class = VenueSerializer
  queryset = Venue.objects.all()
  search_fields = ( 
    'name', 
  )

class ShowListView(viewsets.ModelViewSet):
  serializer_class = ShowSerializer
  queryset = Show.objects.all()
  filterset_fields = (
    'sets__artist__id',
    'venue__id',
  )
  search_fields = (
    'id',
  )

class SetListView(viewsets.ModelViewSet):
  serializer_class = SetSerializer
  queryset = Set.objects.all()


def setlistfm_attended(request, user):
  url = f'https://api.setlist.fm/rest/1.0/user/{user}/attended'
  response = requests.get(
    url,
    params = {
      'p': request.GET.get('page')
    },
    headers = {
      'accept': 'application/json',
      'x-api-key': '4JLKCbu35-6Ii7tJycxxcZC652xQV75rYG8N'
    }
  )
  data = response.json()
  return JsonResponse(data)