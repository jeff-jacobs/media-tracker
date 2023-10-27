from rest_framework import serializers
from ..models import Show
from ..serializers.set import SetSerializer
from ..serializers.venue import VenueSerializer

class ShowSerializer(serializers.ModelSerializer):
   sets = SetSerializer(many=True, read_only=True)
   venue = VenueSerializer(read_only=True)
   date = serializers.DateField(format="%m/%d/%Y")
   class Meta:
      model = Show
      fields = ('id', 'date', 'sets', 'venue')