from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import status
from ..models.artist import Artist
from ..serializers.artist import ArtistSerializer, ArtistCreateSerializer

class ArtistListView(APIView, LimitOffsetPagination):

  def get(self, request):

    artists = Artist.objects.all()
    name = self.request.query_params.get('name')
    show_id = self.request.query_params.get('show_id')

    if show_id is not None:
      artists = artists.filter(sets__show__id=show_id).order_by("sets")

    if name is not None:
      artists = artists.filter(name__icontains=name)

    results = self.paginate_queryset(artists, request, view=self)
    serializer = ArtistSerializer(results, many=True)
    return self.get_paginated_response(serializer.data)
  
  def post(self, request):

    try:
      artist_name = request.data['name']
      Artist.objects.get(name__icontains=artist_name)
      return Response(f'{artist_name} already exists.', status=status.HTTP_409_CONFLICT)
    except Artist.DoesNotExist:
      pass

    artist = ArtistCreateSerializer(data=request.data)
    artist.is_valid(raise_exception=True)
    artist.save()
    return Response(artist.data, status=status.HTTP_200_OK)

class ArtistDetailView(APIView):
  
  def get(self, request, id):
    try:
      query = Artist.objects.get(id=id)
      artist = ArtistSerializer(query)
      return Response(artist.data, status=status.HTTP_200_OK)
    except Artist.DoesNotExist:
      return Response(f'Artist does not exist.', status=status.HTTP_400_BAD_REQUEST)