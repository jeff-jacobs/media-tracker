from rest_framework import serializers
from ..models.show import Show, Set
from ..serializers.venue import VenueSerializer
from ..serializers.artist import ArtistSerializer

class ShowSerializer(serializers.ModelSerializer):
  sets = serializers.SerializerMethodField('get_sets')
  venue = VenueSerializer(read_only=True)
  date = serializers.DateField(format="%m/%d/%Y")
  class Meta:
    model = Show
    fields = ('id', 'date', 'sets', 'venue')

  def get_sets(selfself, obj):
    queryset = Set.objects.filter(show__id=obj.pk).order_by('-order')
    serializer = SetSerializer(queryset, many=True, read_only=True)
    return serializer.data

class SetSerializer(serializers.ModelSerializer):
   artist = ArtistSerializer(read_only=True)
   class Meta:
      model = Set
      fields = ('id', 'show', 'artist', 'order')
