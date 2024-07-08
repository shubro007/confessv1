
from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import *
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator,PageNotAnInteger,EmptyPage

# Create your views here.


def loginuser(request):
    if request.method == 'POST':
        data = request.POST
        #print(data['username'])
        if (not User.objects.filter(username=data['username'])):
            messages.warning(request, "invalid username.")

            return redirect('/')
        
        user = authenticate(username = data['username'], password = data['password'])
        if user is None:
            messages.warning(request, "invalid password")
            return redirect ('/')
        else:
            login(request, user)  
            return redirect('confessions/')
    return render(request, 'index.html')

def register(request):

    if request.method == "POST":
        data = request.POST
        username = data['username']
        password = data['password']       
        print(username)
        print(password)
        user = User.objects.filter(username=username)
        if user.exists():
            
            messages.warning(request, "username already exists.")

            return redirect('/register/')
        user = User.objects.create(
            username = username,
        )
        user.set_password(password)
        user.save()
        messages.warning(request, "account createed successfully.")
        return redirect('/register/')
    
    return render(request, 'register.html',context={'message':messages})

def confessions(request):
    requestpath = request.path
    aa = confessdata.objects.all()


    if (requestpath=='/sortn/'):
        a = aa.order_by('-create_at')
    elif (requestpath=='/sortl'):
        a = aa.order_by('-like_count')
    else:
        a = aa.order_by('-comment_count')

    p = Paginator(a, 10)  # creating a paginator object
    # getting the desired page number from url
    page_number = request.GET.get('page')
    try:
        page_obj = p.get_page(page_number)  # returns the desired page object
    except PageNotAnInteger:
        # if page_number is not an integer then assign the first page
        page_obj = p.page(1)
    except EmptyPage:
        # if page is empty then return last page
        page_obj = p.page(p.num_pages)

    # a = confessdata.objects.all()
    # b = Comment.objects.all()
    return render(request,'main.html',context={'confessdata':a,'page_obj':page_obj})

def createconfess(request):
    if request.method == "POST":
        data = request.POST
        print(data['confession'])
        confession = data.get('confession')
        
        confessdata.objects.create(user=request.user,confession=confession)
        return redirect('/confessions/')
    return render(request, 'createconfess.html')

# def viewconfession(request,id):
   
#     a = confessdata.objects.get(id=id)
#     b = Comment.objects.filter(postid = id)
#     confessdata.objects.filter(id=id).update(comment_count = Comment.objects.filter(postid = id).count())
#     if request.method == "POST":
        
#         data = request.POST
#         text = (data['comment'])
#         Comment.objects.create(text = text,author = request.user, postid = id )
        

#     context = {"data":a, 'commentdata':b}
#     return render(request, 'viewconfession.html',context)


def viewconfession(request,id):
   
    a = confessdata.objects.get(id=id)
    b = Commentv2.objects.filter(post = id)
    post = get_object_or_404(confessdata, id=id)

    if request.method == "POST":
        data = request.POST
        text = (data['comment'])
        Commentv2.objects.create(text = text,author = request.user, post = post )
    confessdata.objects.filter(id=id).update(comment_count = Commentv2.objects.filter(post = post).count())
        
    context = {"data":a, 'commentdata':b}
    return render(request, 'viewconfession.html',context)

def like(request,id):
    post = get_object_or_404(confessdata, id=id)
    if request.method =="POST":
        data = request.POST
        Like.objects.create(user = request.user, post = post)
        confessdata.objects.filter(id = id).update(like_count= Like.objects.filter(post = post).count())

    #return redirect('/confessions/')

def unlike(request,id):
    post = get_object_or_404(confessdata, id=id)
    if request.method =="POST":
        Like.objects.get(user = request.user, post = post).delete()
    confessdata.objects.filter(id = id).update(like_count= Like.objects.filter(post = post).count())


def logout_user(request):
    logout(request)
    return redirect('/')