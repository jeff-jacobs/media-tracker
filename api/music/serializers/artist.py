from rest_framework import serializers
from ..models import Artist, Set

class ArtistSetSerializer(serializers.ModelSerializer):
   class Meta:
      model = Set
      fields = ('id',)

class ArtistSerializer(serializers.ModelSerializer):
  class Meta:
      model = Artist
      fields = ('id', 'name', 'sets')


