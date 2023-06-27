# Api

## Running the code

Create virtual environment with `python -m venv /venv`

First install all the required packages with `pip install -r requirements.txt`

After the packages have been installed run:

```
python manage.py makemigrations synapi
python manage.py migrate
```

Use `python manage.py createsuperuser` to create a user, so you can use the account to login to the management portal.

Use `python manage.py runserver` to start the server.
