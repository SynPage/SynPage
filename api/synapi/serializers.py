from django.contrib.auth.models import User, Group
from rest_framework import serializers

from .models.tutorial import Tutorial, TutorialStep, TutorialTextBox


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class TutorialTextBoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = TutorialTextBox
        fields = ['id', 'title', 'description', 'targetSelector', 'step_id']


class TutorialStepSerializer(serializers.ModelSerializer):
    textboxes = TutorialTextBoxSerializer(many=True, read_only=True)

    class Meta:
        model = TutorialStep
        fields = ['id', 'name', 'index', 'textboxes', 'tutorial_id']


class StepBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = TutorialStep
        fields = ['id', 'name', 'index']


class TutorialSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    steps = TutorialStepSerializer(many=True, read_only=True)

    class Meta:
        model = Tutorial
        fields = ['id', 'name', 'targetSite', 'steps']


class TutorialMetadataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutorial
        fields = ['id', 'name', 'targetSite']


class TutorialBriefSerializer(serializers.ModelSerializer):
    steps = StepBriefSerializer(many=True)

    class Meta:
        model = Tutorial
        fields = ['id', 'name', 'targetSite', 'steps']
