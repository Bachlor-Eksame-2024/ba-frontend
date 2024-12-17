# Stage 1: Build the React app
FROM node:18-alpine AS build

WORKDIR /app

# Add build arguments for production
ARG VITE_API_URL
ARG VITE_API_KEY
ARG VITE_STRIPE_TEST_KEY

# Set environment variables
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_KEY=$VITE_API_KEY
ENV VITE_STRIPE_TEST_KEY=$VITE_STRIPE_TEST_KEY

COPY package*.json ./
RUN npm install

COPY . .
# Use production environment for build
RUN cp .env.production .env
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]