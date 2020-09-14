FROM node:12-alpine
WORKDIR /cicd/
ENV PATH "$PATH:/cicd/"
COPY . .
