from rest_framework import serializers
from ..models.artist import Artist

class ArtistSerializer(serializers.ModelSerializer):
  class Meta:
      model = Artist
      fields = ('id', 'name', 'sets', 'albums')

class ArtistCreateSerializer(serializers.ModelSerializer):
  class Meta:
      model = Artist
      fields = ('id', 'name')
