# media-tracker api

Django Python application.

## Installing Django within your existing virtualenv

`pipenv install`

Pipfile includes following packages:

- django
- django-admin
- django-environ
- djangorestframework
- djangorestframework-simplejwt
- django-cors-headers
- django-filter
- psycopg2
- requests

## .env

Provided your `.env` file is already configured for your local database, you'll need the additional items:

```
SETLISTFM_API_KEY=[KEY]
```

## SetlistFM seed script

[music/management/commands/setlistfm_seed.py](music/management/commands/setlistfm_seed.py)

A management command to pull shows for a single user from setlist.fm's API. It will take all Sets within a single concert and map them up to a single Show record. Each Set has an Artist associated, and each Show has a Venue associated. This command will create Artist and Venue records if they do not already exist.

`python manage.py setlistfm_seed [setlistfm username]`
