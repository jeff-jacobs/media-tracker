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
from django.urls import path, include
from rest_framework import routers
from music.views.artist import ArtistListView, ArtistDetailView
from music.views.album import AlbumListView, AlbumDetailView, RankedAlbumListView
from music.views.show import ShowListView
from music.views.venue import VenueListView

router = routers.DefaultRouter()
router.register(r'ranked-album-lists', RankedAlbumListView, 'ranked-album-list')
router.register(r'shows', ShowListView, 'show')
router.register(r'venues', VenueListView, 'venue')

urlpatterns = [
    path('', include(router.urls)),
    path('artists/', ArtistListView.as_view()),
    path('artists/<int:id>/', ArtistDetailView.as_view()),
    path('albums/', AlbumListView.as_view()),
    path('albums/<int:id>/', AlbumDetailView.as_view()),
]
