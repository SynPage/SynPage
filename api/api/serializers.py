from django.contrib.auth.models import User, Group
from rest_framework import serializers

from models.Tutorial import Tutorial
from models.TutorialStep import TutorialStep
from models.TutorialTextBox import TutorialTextBox


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
        fields = ['title', 'description', 'targetSelector', 'step_id']


class TutorialStepSerializer(serializers.ModelSerializer):
    components = TutorialTextBoxSerializer(many=True, read_only=True)

    class Meta:
        model = TutorialStep
        fields = ['name', 'index', 'components', 'tutorial_id']


class TutorialSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    steps = TutorialStepSerializer(many=True, read_only=True)

    class Meta:
        model = Tutorial
        fields = ['id', 'name', 'targetSite', 'steps']
