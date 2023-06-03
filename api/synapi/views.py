from django.contrib.auth.models import User, Group
from django.http import JsonResponse
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework import viewsets, filters
from rest_framework import permissions
from rest_framework.decorators import action

from .models.tutorial import Tutorial, Step, Action, Recommendation
from synapi.serializers import (
    UserSerializer,
    GroupSerializer,
    TutorialSerializer,
    TutorialInfoSerializer,
    StepSerializer,
    ActionSerializer,
    RecommendationSerializer, TutorialCreationSerializer
)
from .tutorial_generation import generate_tutorial_and_save


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
        if self.action == 'create':
            return TutorialCreationSerializer
        return super().get_serializer_class()

    @extend_schema(
        responses=TutorialSerializer,
        request=None,
        parameters=[
            OpenApiParameter(
                name='question',
                description='The question for which the tutorial will be generated.',
                required=True,
                type=OpenApiTypes.STR,
                location=OpenApiParameter.QUERY
            )
        ],
        description='Generate a tutorial based on a given question and return the tutorial ID as a JSON response.',
    )
    @action(detail=False, methods=['post'])
    def generate(self, request, *args, **kwargs):
        question = request.query_params.get('question')

        if not question:
            return JsonResponse({"detail": "Question parameter is required."}, status=400)

        try:
            tutorial = generate_tutorial_and_save(question)
        except Exception as e:
            return JsonResponse({"detail": str(e)}, status=400)

        return JsonResponse(TutorialSerializer(instance=tutorial).data)


class StepViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Step.objects.all()
    serializer_class = StepSerializer

    # permission_classes = [permissions.IsAuthenticated]


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
