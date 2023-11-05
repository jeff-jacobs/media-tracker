from django.db import models

class RankedItem(models.Model):
    RANKS = [
         ('S', 'S Tier'),
         ('A', 'A Tier'),
         ('B', 'B Tier'),
         ('C', 'C Tier'),
         ('D', 'D Tier'),
         ('F', 'F Tier'),
    ]
    rank = models.CharField(max_length=1, choices=RANKS, blank=True, null=True)
    order = models.IntegerField(default=1)

    class Meta:
          abstract = True