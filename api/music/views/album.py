from rest_framework import viewsets
from ..models.album import Album, RankedAlbumList
from ..serializers.album import AlbumSerializer, RankedAlbumListSerializer

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

class RankedAlbumListView(viewsets.ModelViewSet):
  serializer_class = RankedAlbumListSerializer
  queryset = RankedAlbumList.objects.all()
  filterset_fields = (
    'artist__id',
  )