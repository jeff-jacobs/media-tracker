from rest_framework import serializers
from ..models import Set
from ..serializers.artist import ArtistSerializer

class SetSerializer(serializers.ModelSerializer):
   artist = ArtistSerializer(read_only=True)
   class Meta:
      model = Set
      fields = ('id', 'show', 'artist')