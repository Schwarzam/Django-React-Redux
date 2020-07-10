from leads.models import Lead
from rest_framework import viewsets, permissions
from .serializers import LeadSerializer

## Lead viewset
class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = LeadSerializer
