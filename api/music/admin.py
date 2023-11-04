from django.contrib import admin
from .models.artist import Artist
from .models.album import Album, RankedAlbumList, RankedAlbum
from .models.show import Show, Set
from .models.venue import Venue

class ArtistAdmin(admin.ModelAdmin):
    list_display = ('name', 'id')
    search_fields = ('name',)

admin.site.register(Artist, ArtistAdmin)

class AlbumAdmin(admin.ModelAdmin):
    list_display = ('name', 'id', 'release_date')
    search_fields = ('name',)

admin.site.register(Album, AlbumAdmin)

class RankedAlbumInline(admin.TabularInline):
    model = RankedAlbum
    ordering = ['order']

class RankedAlbumListAdmin(admin.ModelAdmin):
    list_display = ('name', 'id')
    inlines = [RankedAlbumInline]

admin.site.register(RankedAlbumList, RankedAlbumListAdmin)

class SetInline(admin.TabularInline):
    model = Set
    ordering = ['order']

class ShowAdmin(admin.ModelAdmin):
    list_display = ('id', 'date')
    inlines = [SetInline]

admin.site.register(Show, ShowAdmin)

class VenueAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

admin.site.register(Venue, VenueAdmin)