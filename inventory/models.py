import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
# from versatileimagefield.fields import VersatileImageField

class DeveloperAdmin(AbstractUser):
    DEFAULT_PK = 1

    is_admin_user = models.BooleanField(default=False)
    is_super_admin = models.BooleanField(default=False)

    def __str__(self):
        return self.username

class AdminUsers(models.Model):
    admin_user = models.OneToOneField(
        DeveloperAdmin, on_delete=models.SET_DEFAULT, default=DeveloperAdmin.DEFAULT_PK, related_name='admin_user')
    designation = models.CharField(max_length=20, null=True)
    profile_photo = models.ImageField(upload_to="media", null=True)
    mobile = models.CharField(max_length=15, null=True)
    password = models.CharField(max_length=30, null=True)

    def __str__(self):
        return self.admin_user.username

    class Meta:
        ordering = ('-id',)

class Products(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ProductID = models.BigIntegerField(unique=True)
    ProductCode = models.CharField(max_length=255, unique=True)
    ProductName = models.CharField(max_length=255)
    ProductImage = models.ImageField(upload_to="uploads/", blank=True, null=True)
    CreatedDate = models.DateTimeField(auto_now_add=True)
    UpdatedDate = models.DateTimeField(blank=True, null=True)
    # CreatedUser = models.ForeignKey(DeveloperAdmin, related_name="user_products_objects", on_delete=models.CASCADE)
    CreatedUser = models.CharField(max_length=255)
    IsFavourite = models.BooleanField(default=False)
    Active = models.BooleanField(default=True)
    HSNCode = models.CharField(max_length=255, blank=True, null=True)
    TotalStock = models.DecimalField(default=0.00, max_digits=20, decimal_places=8, blank=True, null=True)

    def __str__(self):
        return self.ProductName

    class Meta:
        db_table = "products_product"
        unique_together = (("ProductCode", "ProductID"),)
        ordering = ("-CreatedDate", "ProductID")

class Variant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey(Products, related_name='variants', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.product.ProductName} - {self.name}"

    class Meta:
        db_table = "variants"
        unique_together = (('product', 'name'),)

class SubVariant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    variant = models.ForeignKey(Variant, related_name='subvariants', on_delete=models.CASCADE)
    option = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.variant.name} - {self.option}"

    class Meta:
        db_table = "subvariants"
        unique_together = (('variant', 'option'),)
