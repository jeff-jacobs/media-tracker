from django.db import models

class Artist(models.Model):
    name = models.CharField(max_length=120)
    abbreviation = models.CharField(max_length=20, null=True)
    created_ts = models.DateTimeField(auto_now_add=True)
    last_modified_ts = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name