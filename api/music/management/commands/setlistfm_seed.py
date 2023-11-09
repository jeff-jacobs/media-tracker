import os
import requests
from django.core.management.base import BaseCommand
from datetime import datetime
import math
from ...models.artist import Artist
from ...models.show import Show, Set
from ...models.venue import Venue

def seed_setlists(username):
  data = get_setlistfm_setlists(1, username)
  total_pages = math.floor(data['total'] / data['itemsPerPage'])

  for page in range(0, total_pages):
    page = page+1
    data = get_setlistfm_setlists(page, username)
    print(data)
    create_setlists(data['setlist'])

def get_setlistfm_setlists(page, username):
  url = f'https://api.setlist.fm/rest/1.0/user/{username}/attended'
  response = requests.get(
    url,
    params = {
      'p': page
    },
    headers = {
      'accept': 'application/json',
      'x-api-key': os.environ.get('SETLISTFM_API_KEY')
    }
  )
  data = response.json()
  return data

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

  def add_arguments(self, parser):
    parser.add_argument('username', type=str)

  def handle(self, *args, **options):
    # clear_setlists()
    # clear_shows()
    # clear_artists()
    # clear_venues()
    seed_setlists(options['username'])
    print('completed')