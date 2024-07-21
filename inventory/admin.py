# from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import DeveloperAdmin, AdminUsers, Products, Variant, SubVariant

admin.site.register(DeveloperAdmin)
admin.site.register(AdminUsers)
admin.site.register(Products)
admin.site.register(Variant)
admin.site.register(SubVariant)