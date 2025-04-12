FROM node:20.17-slim

RUN apt-get update && apt-get install -y \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN npm install -g npm@11.3.0
COPY package.json package-lock.json ./
RUN npm install

EXPOSE 5173