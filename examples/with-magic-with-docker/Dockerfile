# base image
FROM node:16.13-alpine

# Create and change to the app directory.
WORKDIR /usr/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY . .

# Install production dependencies.
# If you add a package-lock.json, speed your build by switching to 'npm ci'.
RUN npm ci --only=production

# Generate envirorment variables from arguments

ARG MAGIC_TOKEN
ARG NEXT_PUBLIC_MAGIC_PUB_TOKEN
ARG MAGIC_ENCRYPTION_SECRET
ARG NEXT_PUBLIC_IS_PROTECTED

ENV MAGIC_TOKEN=$MAGIC_TOKEN
ENV NEXT_PUBLIC_MAGIC_PUB_TOKEN=$NEXT_PUBLIC_MAGIC_PUB_TOKEN
ENV MAGIC_ENCRYPTION_SECRET=$MAGIC_ENCRYPTION_SECRET
ENV NEXT_PUBLIC_IS_PROTECTED=$NEXT_PUBLIC_IS_PROTECTED

# Copy local code to the container image.

RUN npm run build

# Run the web service on container startup.
CMD [ "npm", "start" ]