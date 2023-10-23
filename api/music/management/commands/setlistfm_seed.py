import requests
from django.core.management.base import BaseCommand
from datetime import datetime
import math
from ...models import Set, Show, Artist, Venue

def get_setlistfm_setlists(page):
  print(page)
  url = f'https://api.setlist.fm/rest/1.0/user/Jeffer/attended'
  response = requests.get(
    url,
    params = {
      'p': page
    },
    headers = {
      'accept': 'application/json',
      'x-api-key': '4JLKCbu35-6Ii7tJycxxcZC652xQV75rYG8N'
    }
  )
  data = response.json()
  return data

def seed_setlists():
  data = get_setlistfm_setlists(1)
  total_pages = math.floor(data['total'] / data['itemsPerPage'])
  print(total_pages)

  for page in range(0, total_pages):
    page = page+1
    data = get_setlistfm_setlists(page)
    print(data)
    create_setlists(data['setlist'])


def create_setlists(setlists):
  for setlist in setlists:

    ## Artist get/create
    artist_name = setlist['artist']['name']
    artist=None
    try:
      artist = Artist.objects.get(name__iexact=artist_name)
    except Artist.DoesNotExist:
      artist = Artist.objects.create(name=artist_name)

    ## Venue get/create
    venue_name = setlist['venue']['name']
    venue=None
    try:
      venue = Venue.objects.get(name__iexact=venue_name)
    except Venue.DoesNotExist:
      venue = Venue.objects.create(name=venue_name)

    ## Show get/create
    show_date = datetime.strptime(setlist['eventDate'], "%d-%m-%Y").date()
    show=None
    try:
      show = Show.objects.get(date=show_date)
    except Show.DoesNotExist:
      show = Show.objects.create(date=show_date, venue=venue)
    
    ## Set create
    try:
      Set.objects.get(show=show, artist=artist)
    except Set.DoesNotExist:
      Set.objects.create(show=show, artist=artist)

def clear_setlists():
  Set.objects.all().delete()
  
def clear_shows():
  Show.objects.all().delete()

def clear_artists():
  Artist.objects.all().delete()

def clear_venues():
  Venue.objects.all().delete()

class Command(BaseCommand):
  def handle(self, *args, **options):
    clear_setlists()
    clear_shows()
    clear_artists()
    clear_venues()
    seed_setlists()
    print('completed')