from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class confessdata(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)   #setnull, setdefault #cascade
    confession = models.TextField(max_length=300)
    create_at = models.DateTimeField(auto_now_add=True)
    comment_count = models.IntegerField(default=0)
    like_count = models.IntegerField(default=0)
    

class Comment(models.Model):
    #ost = models.ForeignKey(confessdata, related_name='comments', on_delete=models.CASCADE)
    postid = models.IntegerField(default=0)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(max_length=150)
   
class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(confessdata, on_delete=models.CASCADE)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'post'], name='unique_like')
        ]

class Commentv2(models.Model):
    post = models.ForeignKey(confessdata, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(max_length=150)
