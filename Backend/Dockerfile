cat <<EOF > Dockerfile
# Use the official Node image.
# https://hub.docker.com/_/node
FROM node:14-alpine

# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./
RUN npm install

# Copy local code to the container image.
COPY . /src

# Configure and document the service HTTP port.
ENV PORT 8080
EXPOSE $PORT

# Run the web service on container startup.
CMD ["npm", "run", "start"]
EOF