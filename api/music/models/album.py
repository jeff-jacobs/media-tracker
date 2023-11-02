from django.db import models
from .artist import Artist
from .base import RankedBase

class Album(models.Model):
    name = models.CharField(max_length=120)
    release_date = models.DateTimeField(null=True, blank=True)
    artist = models.ForeignKey(Artist, related_name="albums", on_delete=models.PROTECT)
    cover_art = models.URLField(null=True, blank=True)
    created_ts = models.DateTimeField(auto_now_add=True)
    last_modified_ts = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-release_date', 'name']

    def __str__(self):
        return self.name