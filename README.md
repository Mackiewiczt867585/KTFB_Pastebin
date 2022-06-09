KTFB_Pastebin is a web application imitating a popular site pastebin.com.
Follow the guide below to install and contribute to the project!

Assuming you have Docker installed, type (in the root folder of the project):

# docker-compose build 

To create necessary images to run the containerized app.
When done type:

# docker-compose up

This command builds, (re)creates, starts, and attaches to containers for a service.
# NOTE: sudo prefix may be needed for docker commands to function properly
Containers should run successfully as all the necessary dependencies were included and installed in build step.
Commands above were useful for creating development environment. If you would like to build production environment
type:

# docker-compose -f docker-compose.prod.yaml build

followed by:

# docker-compose -f docker-compose.prod.yaml up


To setup pre-commit hooks to contribute in project's coding standards install pre-commit in your Python environment.
To do that, use pip to install by:

# pip install pre-commit

followed by:

# pre-commit install

Now you are ready to go, hooks will apply on every commit you try to make and they will be making automatic
changes to your code if possible! Thank you for contributing!
