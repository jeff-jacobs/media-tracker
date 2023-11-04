from rest_framework import viewsets
from ..models.show import Show, Set
from ..serializers.show import ShowSerializer, SetSerializer

class ShowListView(viewsets.ModelViewSet):
  serializer_class = ShowSerializer
  queryset = Show.objects.all()
  filterset_fields = (
    'sets__artist__id',
    'venue__id',
  )
  search_fields = (
    'id',
  )

class SetListView(viewsets.ModelViewSet):
  serializer_class = SetSerializer
  queryset = Set.objects.all()