# Generated by Django 4.1.3 on 2022-11-05 13:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('Name', models.CharField(max_length=50)),
                ('Email', models.EmailField(max_length=254, primary_key=True, serialize=False, unique=True)),
            ],
            options={
                'db_table': 'users',
            },
        ),
    ]
