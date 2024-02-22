FROM ghcr.io/puppeteer/puppeteer:22.1.0

ENV PUPPETEER_SKIP_DOWNLOAD \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .
CMD ["node","index.js"]