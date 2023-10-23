from django.contrib import admin
from .models import Artist, Album, Show, Set, Venue

class ArtistAdmin(admin.ModelAdmin):
    list_display = ('name', 'id')
    search_fields = ('name',)

admin.site.register(Artist, ArtistAdmin)

class AlbumAdmin(admin.ModelAdmin):
    list_display = ('name', 'id', 'release_date')
    search_fields = ('name',)

admin.site.register(Album, AlbumAdmin)

class SetInline(admin.TabularInline):
    model = Set

class ShowAdmin(admin.ModelAdmin):
    list_display = ('id', 'date')
    inlines = [SetInline]

admin.site.register(Show, ShowAdmin)

class SetAdmin(admin.ModelAdmin):
    list_display = ('id', 'show', 'artist')
    list_filter = ('artist',)

admin.site.register(Set, SetAdmin)

class VenueAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

admin.site.register(Venue, VenueAdmin)