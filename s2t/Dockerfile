FROM node:20.17-slim

RUN apt-get update && apt-get install -y \
    git \
    curl \
    ffmpeg \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN npm install -g npm@11.3.0
COPY package.json ./
RUN npm install

COPY ./requirements.txt ./
RUN pip install --no-cache-dir --break-system-packages -r requirements.txt