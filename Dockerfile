# Stage 1: Build the React app
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files first
COPY package*.json ./
RUN npm install

# Copy environment files
COPY .env.production .env

# Copy rest of the application
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]