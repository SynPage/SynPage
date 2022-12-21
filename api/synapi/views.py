from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response

from .models.tutorial import Tutorial, TutorialStep, TutorialTextBox
from synapi.serializers import (
    StepBriefSerializer,
    TutorialBriefSerializer,
    TutorialMetadataSerializer,
    UserSerializer,
    GroupSerializer,
    TutorialSerializer,
    TutorialStepSerializer,
    TutorialTextBoxSerializer
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
    # permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return TutorialBriefSerializer
        elif self.action == 'list':
            return TutorialMetadataSerializer
        return super().get_serializer_class()


class TutorialStepViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = TutorialStep.objects.all()
    serializer_class = TutorialStepSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'list':
            return StepBriefSerializer
        return super().get_serializer_class()


class TutorialTextBoxViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = TutorialTextBox.objects.all()
    serializer_class = TutorialTextBoxSerializer
    # permission_classes = [permissions.IsAuthenticated]
