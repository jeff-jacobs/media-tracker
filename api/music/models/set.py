from django.db import models
from .show import Show
from .artist import Artist

class Set(models.Model):
    show = models.ForeignKey(Show, related_name="sets", on_delete=models.PROTECT)
    artist = models.ForeignKey(Artist, related_name="sets", on_delete=models.PROTECT)
    order = models.IntegerField(null=True)

    def __str__(self):
        return self.artist.name