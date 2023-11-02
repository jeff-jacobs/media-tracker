from rest_framework import serializers
from ..models.album import Album
from ..serializers.artist import ArtistSerializer

class AlbumSerializer(serializers.ModelSerializer):
  artist = ArtistSerializer(read_only=True)
  class Meta:
      model = Album
      fields = ('id', 'name', 'release_date', 'artist', 'cover_art')