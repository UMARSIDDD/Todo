from django.db import models
from account.models import User
# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class Task(models.Model):
    user_id=models.ForeignKey(User, on_delete=models.CASCADE)
    task_name = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='tasks') 
    def __str__(self):
        return self.task_name
