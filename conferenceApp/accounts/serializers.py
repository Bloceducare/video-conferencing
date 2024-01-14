from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'name', 'class_stack', 'cohort', 'email', 'role']
        read_only_fields = ['role']  # Make 'role' field read-only by default

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        # Allow admin/superuser to update the 'role' field
        if self.context['request'].user.is_staff:
            instance.role = validated_data.get('role', instance.role)
        return super().update(instance, validated_data)




class SigninSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        exclude = ['password', 'user_permissions']

class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

class CompletePasswordResetSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True)
    