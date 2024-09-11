FROM lipanski/docker-static-website:2.2.1

# Copy your static files
COPY ./dist .

CMD ["/busybox", "httpd", "-f", "-v", "-p", "8080", "-c", "httpd.conf"]