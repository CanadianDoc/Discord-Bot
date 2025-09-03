FROM node:20-slim

# safer non-root user
RUN useradd -ms /bin/bash appuser
WORKDIR /app

# install deps
COPY package*.json ./
RUN npm ci --omit=dev

# copy source
COPY . .

USER appuser
ENV NODE_ENV=production

# run the discord bot
CMD ["node", "."]