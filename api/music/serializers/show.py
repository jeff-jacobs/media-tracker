from rest_framework import serializers
from ..models import Show, Set
from ..serializers.set import SetSerializer
from ..serializers.venue import VenueSerializer

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
    