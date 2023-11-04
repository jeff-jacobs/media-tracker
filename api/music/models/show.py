from django.db import models
from .venue import Venue
from .artist import Artist
    
class Show(models.Model):
    date = models.DateField()
    venue = models.ForeignKey(Venue, null=True, related_name="shows", on_delete=models.PROTECT)

    class Meta:
      ordering = ['-date']

    def __str__(self):
        return str(self.date)

class Set(models.Model):
    show = models.ForeignKey(Show, related_name="sets", on_delete=models.PROTECT)
    artist = models.ForeignKey(Artist, related_name="sets", on_delete=models.PROTECT)
    order = models.IntegerField(null=True)

    def __str__(self):
        return self.artist.name