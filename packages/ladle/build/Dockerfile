# Use an Nginx image as the base image
FROM nginx

# Copy the static files to the Nginx default public directory
COPY ./dist /usr/share/nginx/html

# Expose port 80 for incoming traffic
EXPOSE 80

# Set the default command to start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
