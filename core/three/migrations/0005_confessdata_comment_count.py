# Generated by Django 5.0.6 on 2024-06-30 19:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('three', '0004_remove_comment_post_comment_postid'),
    ]

    operations = [
        migrations.AddField(
            model_name='confessdata',
            name='comment_count',
            field=models.IntegerField(default=0),
        ),
    ]
