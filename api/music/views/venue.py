from rest_framework import viewsets
from ..models.venue import Venue
from ..serializers.venue import VenueSerializer

class VenueListView(viewsets.ModelViewSet):
  serializer_class = VenueSerializer
  queryset = Venue.objects.all()
  search_fields = ( 
    'name', 
  )