# Stage 1: Build the React app
FROM node:18-alpine AS build

WORKDIR /app

# Define build arguments
ARG VITE_API_URL
ARG VITE_API_KEY
ARG VITE_STRIPE_TEST_KEY

# Set environment variables from build arguments
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_API_KEY=${VITE_API_KEY}
ENV VITE_STRIPE_TEST_KEY=${VITE_STRIPE_TEST_KEY}

COPY package*.json ./
RUN npm install

RUN npm i -g serve

COPY . .
RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]