from django.db import models
    
class Venue(models.Model):
    name = models.CharField(max_length=120)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name