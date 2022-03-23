FROM node:17-alpine3.14
WORKDIR /frontend
COPY package.json package-lock.json ./
RUN npm install 
RUN npm install react-scripts@5.0.0 -g 
<<<<<<< HEAD
RUN npm install javascript-time-ago
RUN npm install react-time-ago
=======
RUN npm install react-time-ago
RUN npm install javascript-time-ago
>>>>>>> [10a][DO]nginx setup (work in progress)
COPY . ./
EXPOSE 3000
