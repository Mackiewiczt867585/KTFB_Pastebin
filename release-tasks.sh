python manage.py makemigrations &&
python manage.py migrate &&
python manage.py collectstatic --noinput &&
python manage.py test &&
gunicorn project.wsgi:application --bind 0.0.0.0:5432
