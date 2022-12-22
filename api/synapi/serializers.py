from django.contrib.auth.models import User, Group
from rest_framework import serializers

from .models.tutorial import Tutorial, Step, Action


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = ['id', 'description', 'target_elem', 'step_id', 'index', 'mouse_button', 'mouse_action']


class StepSerializer(serializers.ModelSerializer):
    actions = ActionSerializer(many=True, read_only=True)

    class Meta:
        model = Step
        fields = ['id', 'title', 'description', 'index', 'actions', 'tutorial_id']


class StepBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = ['id', 'title', 'index']


class TutorialSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    steps = StepSerializer(many=True, read_only=True)

    class Meta:
        model = Tutorial
        fields = ['id', 'title', 'description', 'target_site', 'steps']


class TutorialMetadataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutorial
        fields = ['id', 'title', 'description', 'target_site']


class TutorialBriefSerializer(serializers.ModelSerializer):
    steps = StepBriefSerializer(many=True, read_only=True)

    class Meta:
        model = Tutorial
        fields = ['id', 'title', 'description', 'target_site', 'steps']
