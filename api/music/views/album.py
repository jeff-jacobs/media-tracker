from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import status
from django.db.models import Q

from ..models.album import Album, RankedAlbumList
from ..serializers.album import AlbumSerializer, AlbumCreateSerializer, RankedAlbumListSerializer

class AlbumListView(APIView, LimitOffsetPagination):

  def get(self, request):

    albums = Album.objects.all().order_by('-release_date')
    search = self.request.query_params.get('search')
    name = self.request.query_params.get('name')
    artist_id = self.request.query_params.get('artist_id')

    if search is not None:
      albums = albums.filter(Q(name__icontains=search) | Q(artist__name__icontains=search))

    if artist_id is not None:
      albums = albums.filter(artist__id=artist_id).order_by("name")

    if name is not None:
      albums = albums.filter(name__icontains=name)

    results = self.paginate_queryset(albums, request, view=self)
    serializer = AlbumSerializer(results, many=True)
    return self.get_paginated_response(serializer.data)
  
  def post(self, request):

    try:
      album_name = request.data['name']
      Album.objects.get(name__icontains=album_name)
      return Response(f'{album_name} already exists.', status=status.HTTP_409_CONFLICT)
    except Album.DoesNotExist:
      pass

    album = AlbumCreateSerializer(data=request.data)
    album.is_valid(raise_exception=True)
    album.save()
    return Response(album.data, status=status.HTTP_200_OK)

class AlbumDetailView(APIView):
  
  def get(self, request, id):
    try:
      query = Album.objects.get(id=id)
      artist = AlbumSerializer(query)
      return Response(artist.data, status=status.HTTP_200_OK)
    except Album.DoesNotExist:
      return Response(f'Album does not exist.', status=status.HTTP_400_BAD_REQUEST)


class RankedAlbumListView(viewsets.ModelViewSet):
  serializer_class = RankedAlbumListSerializer
  queryset = RankedAlbumList.objects.all()
  filterset_fields = (
    'artist__id',
  )