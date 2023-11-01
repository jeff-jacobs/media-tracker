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
    
class Venue(models.Model):
    name = models.CharField(max_length=120)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
    
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
    
