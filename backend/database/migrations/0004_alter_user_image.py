# Generated by Django 4.1.3 on 2022-11-20 12:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0003_alter_user_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='Image',
            field=models.CharField(max_length=1000),
        ),
    ]
