from django.contrib.auth.models import User, Group
from rest_framework import serializers

from .models.tutorial import Tutorial, Step, Action, Recommendation


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
        fields = ['index', 'type', 'target_element', 'extras']

    def create(self, validated_data):
        step_id = self.context.get('step_id')
        action = Action.objects.create(**validated_data, step_id=step_id)
        action.save()
        return action


class StepSerializer(serializers.ModelSerializer):
    actions = ActionSerializer(many=True, read_only=True)

    class Meta:
        model = Step
        fields = ['tutorial_id', 'index', 'title', 'description', 'actions']


class RecommendationSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)
    tutorial_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Recommendation
        fields = ['tutorial_id', 'title', 'description', 'created_at', 'updated_at', 'media', 'link']


class TutorialSerializer(serializers.ModelSerializer):
    steps = StepSerializer(many=True, read_only=True)
    recommendations = RecommendationSerializer(many=True, read_only=True)

    class Meta:
        model = Tutorial
        fields = ['title', 'description', 'steps', 'recommendations']


class TutorialInfoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Tutorial
        fields = ['id', 'title', 'description']


class StepCreationSerializer(serializers.ModelSerializer):
    actions = ActionSerializer(many=True, required=True)

    class Meta:
        model = Step
        fields = ['index', 'title', 'description', 'actions']

    def create(self, validated_data):
        step = Step(
            tutorial_id=self.context.get('tutorial_id'),
            index=validated_data['index'],
            title=validated_data['title'],
            description=validated_data['description']
        )
        step.save()
        actions = validated_data['actions']
        action_serializers = ActionSerializer(data=actions, many=True, context={'step_id': step.id})
        if action_serializers.is_valid():
            action_serializers.save()

        return step


class TutorialCreationSerializer(serializers.ModelSerializer):
    steps = StepCreationSerializer(many=True, required=True)

    class Meta:
        model = Tutorial
        fields = ['title', 'description', 'steps']

    def create(self, validated_data):
        tutorial = Tutorial(
            title=validated_data['title'],
            description=validated_data['description']
        )
        tutorial.save()

        steps = validated_data['steps']

        step_serializers = StepCreationSerializer(data=steps, many=True, context={'tutorial_id': tutorial.id})
        if step_serializers.is_valid():
            step_serializers.save(tutorial_id=tutorial.id)

        return tutorial
