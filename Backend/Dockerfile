# Use the official Node image.
# https://hub.docker.com/_/node
FROM node:16

# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./
RUN npm install

# Copy local code to the container image.
COPY . .

# Configure and document the service HTTP port.
ENV PORT 8080

# Run the web service on container startup.
CMD ["npm","run", "start-prod"]