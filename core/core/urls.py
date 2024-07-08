"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
from django.urls import path
from three.views import *
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', loginuser , name="login"),
    path('register/', register, name="register"),
    path('confessions/',confessions,name='main'),
    path('create/',createconfess, name='createconfess'),
    path('viewconfession/<id>/', viewconfession, name="viewconfession"),
    path('like/<id>',like,name='like'),
    path('logout/',logout_user,name='logout'),
    path('unlike/<id>',unlike, name='unlike'),
    path('sortn/',confessions, name='main'),
    path('sortc/',confessions, name='main'),
    path('sortl/',confessions, name='main')

]
