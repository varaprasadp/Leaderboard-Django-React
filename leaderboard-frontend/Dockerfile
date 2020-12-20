FROM node:10-alpine
RUN mkdir /app
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install
ENV PATH="./app/node_modules/.bin:$PATH"
RUN npm install react-scripts@3.4.1
COPY . /app
