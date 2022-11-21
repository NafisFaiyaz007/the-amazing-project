from django.db import models

# Create your models here.
class User(models.Model):
    Name = models.CharField(max_length = 50,)
    Email = models.EmailField(primary_key = True, unique = True)
    #Image = models.ImageField(blank = True, upload_to='images/')
    Image = models.CharField(max_length=1000)

    class Meta:
        db_table = 'users'