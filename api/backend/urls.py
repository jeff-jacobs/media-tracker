"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from music import views as MusicViews

router = routers.DefaultRouter()
router.register(r'music/artists', MusicViews.ArtistListView, 'artist')
router.register(r'music/albums', MusicViews.AlbumListView, 'album')
router.register(r'music/shows', MusicViews.ShowListView, 'show')
router.register(r'music/venues', MusicViews.VenueListView, 'venue')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
