from django.contrib.auth.models import User, Group
from rest_framework import viewsets, filters
from rest_framework import permissions

from .models.tutorial import Tutorial, Step, Action, Recommendation
from synapi.serializers import (
    UserSerializer,
    GroupSerializer,
    TutorialSerializer,
    TutorialInfoSerializer,
    StepSerializer,
    StepInfoSerializer,
    ActionSerializer,
    RecommendationSerializer
)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class TutorialViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Tutorial.objects.all()
    serializer_class = TutorialSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'description']

    # permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'list':
            return TutorialInfoSerializer
        return super().get_serializer_class()


class StepViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Step.objects.all()
    serializer_class = StepSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'list':
            return StepInfoSerializer
        return super().get_serializer_class()


class ActionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Action.objects.all()
    serializer_class = ActionSerializer
    # permission_classes = [permissions.IsAuthenticated]


class RecommendationViewSet(viewsets.ModelViewSet):
    queryset = Recommendation.objects.all()
    serializer_class = RecommendationSerializer
