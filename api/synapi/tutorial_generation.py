import json5 as json5
from django.utils import timezone

from synapi.models.openai import TutorialGenerationRecord
from synapi.openai_client import create_tutorial
from synapi.serializers import TutorialCreationSerializer


def generate_tutorial_and_save(question):
    record = TutorialGenerationRecord(
        question=question,
        created_at=timezone.now()
    )
    messages = list()
    messages.append(get_system_message())
    messages.append({"role": "user", "content": question})
    raw_tutorial = create_tutorial(messages)
    tutorial = process_openai_response(raw_tutorial, record)
    return tutorial


def retry_generation(record: TutorialGenerationRecord):
    retry_record = TutorialGenerationRecord(
        question=record.question,
        created_at=timezone.now()
    )
    messages = list()
    messages.append(get_system_message())
    messages.append({"role": "user", "content": record.question})
    messages.append({"role": "assistant", "content": record.openai_response})
    messages.append({"role": "user", "content": "Fix the tutorial based on the error message: " + record.error_message})
    raw_tutorial = create_tutorial(messages)
    tutorial = process_openai_response(raw_tutorial, retry_record, False)
    return tutorial


def process_openai_response(raw_tutorial, record, retry=True):
    record.openai_response = raw_tutorial
    try:
        raw_tutorial = raw_tutorial[raw_tutorial.find('{'):raw_tutorial.rfind('}') + 1].strip()
        json_tutorial = json5.loads(raw_tutorial)
        serializer = TutorialCreationSerializer(data=json_tutorial)
        serializer.is_valid(raise_exception=True)
        tutorial = serializer.save()
        record.status = TutorialGenerationRecord.Status.Success
        record.tutorial_id = tutorial.id
        record.save()
    except Exception as e:
        record.status = TutorialGenerationRecord.Status.Failed
        record.error_message = e.__str__()
        record.save()
        if retry:
            tutorial = retry_generation(record)
        else:
            raise
    return tutorial


def get_system_message():
    return {
        "role": "system",
        "content": """
A tutorial is defined as following typescript interfaces. 
enum ActionType {
  'None',
  'Left Click',
  'Right Click',
  'Left Double Click',
  'Right Double Click',
  'Enter',
  'Scroll Down',
  'Scroll Up'
}

interface Action {
  index: number;
  target_element: string; // A description of an actionable web element (button, link, search bar)
  type: ActionType; // type is an ActionType but provide it in string
  extras?: string; // optional, extra should only be provided if the action (enter) needs extra information 
}

interface Step {
  index: number;
  title: string;
  description: string;
  actions: Action[];
}

interface Tutorial {
  title: string;
  description: string;
  steps: Step[];
}

You are a reliable assistant that answer user's question in tutorial format, your response should be a json representation of the tutorial.
"""
    }
