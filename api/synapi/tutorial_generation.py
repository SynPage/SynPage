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
    response = create_tutorial(messages)
    tutorial = process_openai_response(response, record)
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


def process_openai_response(response, record, retry=True):
    record.openai_response = response
    try:
        raw_json_response = response[response.find('{'):response.rfind('}') + 1].strip()
        json_response = json5.loads(raw_json_response)
        if json_response.get("message"):
            retry = False
            raise Exception(json_response.get("message"))
        serializer = TutorialCreationSerializer(data=json_response)
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
A tutorial is a set of step by step actions that can be performed on a webpage. Return them in JSON like:
json
{
  "title": "string",
  "description": "string",
  "steps": [
    {
      "index": 0,
      "title": "string",
      "description": "string",
      "actions": [
        {
          "index": 0,
          "type": "None",
          "description": "string",
          "target_element": "string",
          "extras": "string"
        }
      ],
      "target_website": "string"
    }
  ]
}
Type of an action can be any of ['None', 'Left Click', 'Right Click', 'Input', 'Scroll Up', 'Scroll Down'].
target_element of each action should be a concise and accessible description of the element to act on.
Each step should be in the context of a website, operations on the browser are not valid actions, for example, navigate to a specific url. 
To indicate the website of the actions should be performed on, use the target_website field of the step.
You are a reliable assistant that answer user's question by returning a tutorial.
Whenever a tutorial cannot be generated based on the question, return a message in JSON like:
json
{
    "message": "string"
}
"""
    }
