from rest_framework import viewsets
from ..models.artist import Artist
from ..serializers.artist import ArtistSerializer

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