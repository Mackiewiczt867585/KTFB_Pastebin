FROM python:3
WORKDIR /code/backend
RUN pip install --upgrade pip
COPY requirements.txt /code/backend
RUN pip install -r requirements.txt
COPY . /code/backend