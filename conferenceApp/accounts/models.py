from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('student', 'Student'),
        ('superuser', 'Superuser'),
    )

    name = models.CharField(max_length=255)
    class_stack = models.CharField(max_length=255)
    cohort = models.CharField(max_length=255)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')

    def save(self, *args, **kwargs):
        # Save the user
        super().save(*args, **kwargs)

        # Assign permissions based on the selected role
        if self.role == 'admin':
            self.is_staff = True
            self.is_superuser = False  
        elif self.role == 'student':
            self.is_staff = False
            self.is_superuser = False
        elif self.role == 'superuser':
            self.is_staff = True
            self.is_superuser = True
        else:
            pass
        super().save(*args, **kwargs)
