from django.contrib import admin
from .models import Task
from .models import Category

# Register your models here.
class TaskAdmin(admin.ModelAdmin):
    list_display = ('id','user_id','task_name', 'description', 'created_at', 'updated_at', 'category')
admin.site.register(Task,TaskAdmin)
admin.site.register(Category)

