FROM python:3

ENV MICRO_SERVICE=/home/app/microservice
# set work directory

RUN mkdir -p $MICRO_SERVICE
RUN mkdir -p $MICRO_SERVICE/static

# where the code lives
WORKDIR $MICRO_SERVICE

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
# copy project
COPY . $MICRO_SERVICE
RUN pip install -r requirements.txt
#COPY ./entrypoint.sh $MICRO_SERVICE

#CMD ["/bin/bash", "/home/app/microservice/entrypoint.sh"]