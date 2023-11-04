from rest_framework import serializers
from ..models.album import Album, RankedAlbumList, RankedAlbum
from ..serializers.artist import ArtistSerializer

class AlbumSerializer(serializers.ModelSerializer):
  artist = ArtistSerializer(read_only=True)
  class Meta:
      model = Album
      fields = ('id', 'name', 'release_date', 'artist', 'cover_art')

class RankedAlbumListSerializer(serializers.ModelSerializer):
  albums = serializers.SerializerMethodField('get_ranked_albums')
  class Meta:
    model = RankedAlbumList
    fields = ('id', 'name', 'albums')

  def get_ranked_albums(selfself, obj):
      queryset = RankedAlbum.objects.filter(ranked_list_id=obj.pk)
      serializer = RankedAlbumSerializer(queryset, many=True, read_only=True)
      return serializer.data
  
class RankedAlbumSerializer(serializers.ModelSerializer):
  album = AlbumSerializer(read_only=True)
  class Meta:
    model = RankedAlbum
    fields = ('id', 'rank', 'order', 'album')