from django.db import models
from .venue import Venue
    
class Show(models.Model):
    date = models.DateField()
    venue = models.ForeignKey(Venue, null=True, related_name="shows", on_delete=models.PROTECT)

    class Meta:
      ordering = ['-date']

    def __str__(self):
        return str(self.date)
