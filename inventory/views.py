from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Products
from .serializers import ProductSerializer
from decimal import Decimal


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_object(self):
        # Overriding get_object to use ProductID instead of UUID
        product_id = self.kwargs.get('product_id')
        return Products.objects.get(ProductID=product_id)

    @action(detail=True, methods=['get'])
    def get_stock(self, request, *args, **kwargs):
        product = self.get_object()  # Gets the product using ProductID
        return Response({'TotalStock': str(product.TotalStock)})

    @action(detail=True, methods=['post'])
    def add_stock(self, request, *args, **kwargs):
        product = self.get_object()  # Gets the product using ProductID
        amount = request.data.get('amount', 0)
        try:
            amount = Decimal(amount)
        except (ValueError, InvalidOperation):
            return Response({'error': 'Invalid amount'}, status=status.HTTP_400_BAD_REQUEST)
        
        if amount <= 0:
            return Response({'error': 'Amount must be greater than zero'}, status=status.HTTP_400_BAD_REQUEST)
        
        product.TotalStock = (product.TotalStock or Decimal(0)) + amount
        product.save()
        return Response({'TotalStock': str(product.TotalStock)})

    @action(detail=True, methods=['post'])
    def remove_stock(self, request, *args, **kwargs):
        product = self.get_object()  # Gets the product using ProductID
        amount = request.data.get('amount', 0)
        try:
            amount = Decimal(amount)
        except (ValueError, InvalidOperation):
            return Response({'error': 'Invalid amount'}, status=status.HTTP_400_BAD_REQUEST)
        
        if amount <= 0:
            return Response({'error': 'Amount must be greater than zero'}, status=status.HTTP_400_BAD_REQUEST)
        
        if (product.TotalStock or Decimal(0)) < amount:
            return Response({'error': 'Insufficient stock'}, status=status.HTTP_400_BAD_REQUEST)
        
        product.TotalStock -= amount
        product.save()
        return Response({'TotalStock': str(product.TotalStock)})
