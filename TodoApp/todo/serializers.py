from rest_framework import serializers
from .models import Task, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']

class TaskSerializer(serializers.ModelSerializer):
    category = serializers.CharField()
    class Meta:
        model = Task
        fields = ['id','user_id', 'task_name','created_at', 'description','category']
    
    def validate_category(self, attrs):
        if attrs not in ["work", "personal"]:
            raise serializers.ValidationError("Category must be 'Work' or 'Personal'.")
        return attrs
    def create(self, validated_data):
        category_name = validated_data.pop('category')   
        category1=category_name.lower()  
        category = Category.objects.get(name=category1) 
        print(category)
        task = Task.objects.create(category=category, **validated_data)
        print(task)
        return task
    
    def update(self, instance, validated_data):
        print(validated_data)  
        if 'category' in validated_data:
            category_name = validated_data.pop('category')
            try:
                category = Category.objects.get(name=category_name) 
            except Category.DoesNotExist:
                raise serializers.ValidationError(f"Category '{category_name}' does not exist.")     
            instance.category = category  
        instance.task_name = validated_data.get('task_name', instance.task_name)
        instance.description = validated_data.get('description', instance.description)

        instance.save()  # Save the updated instance
        return instance


    
