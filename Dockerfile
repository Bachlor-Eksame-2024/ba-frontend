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

COPY . .
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]