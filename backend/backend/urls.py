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
#import backend.database.endpoints as endpoints    
from rest_framework import routers
from django.conf.urls.static import static
from database.views import *

# create a router object
route = routers.DefaultRouter()
route.register("",seeUser, basename= 'seeUser')
router = routers.DefaultRouter()
router.register("", UserCreateView, basename= 'createUser')
# register the router


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include ('rest_framework.urls')),
#    path('api/', include(router.urls)),
    #path('api/', include('database.api.urls')),
    path('', UserView.as_view()),
    path('<pk>', UserDetailView.as_view()),
    path('create', UserCreateView.as_view()),
    path('<pk>/update/', UserUpdateView.as_view()),
    path('api/', include(route.urls)),
    #path('add/', router.get_urls())
]
