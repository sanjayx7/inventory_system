from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # Custom actions need to be defined properly
    path('products/<int:product_id>/get-stock/', ProductViewSet.as_view({'get': 'get_stock'}), name='get-stock'),
    path('products/<int:product_id>/add-stock/', ProductViewSet.as_view({'post': 'add_stock'}), name='add-stock'),
    path('products/<int:product_id>/remove-stock/', ProductViewSet.as_view({'post': 'remove_stock'}), name='remove-stock'),
]
