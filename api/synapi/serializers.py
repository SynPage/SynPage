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
        fields = ['index', 'description', 'action_type', 'action_target', 'action_content']


class StepSerializer(serializers.ModelSerializer):
    actions = ActionSerializer(many=True, read_only=True)

    class Meta:
        model = Step
        fields = ['index', 'title', 'description', 'actions']


class StepInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = ['id', 'title', 'description', 'index']


class TutorialSerializer(serializers.ModelSerializer):
    steps = StepInfoSerializer(many=True, read_only=True)

    class Meta:
        model = Tutorial
        fields = ['title', 'description', 'target_site', 'steps']


class TutorialInfoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Tutorial
        fields = ['id', 'title', 'description', 'target_site']

