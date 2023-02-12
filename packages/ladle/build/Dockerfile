# Use an Nginx image as the base image
FROM nginx

# Copy the static files to the Nginx default public directory
COPY ./dist /usr/share/nginx/html

# Expose port 8080 for incoming traffic
EXPOSE 8080

# Configure Nginx to listen on port 8080
RUN sed -i 's/listen\s*80;/listen 8080;/' /etc/nginx/conf.d/default.conf

# Set the default command to start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
