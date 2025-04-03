FROM node:16-alpine

WORKDIR /app

# Create a package.json file if it doesn't exist
RUN echo '{"name":"hr-portal-backend","version":"1.0.0","description":"HR Portal Backend","main":"index.js","scripts":{"start":"node index.js"},"dependencies":{}}' > package.json

# Copy existing package.json if it exists (will overwrite the one we created)
COPY package*.json ./

RUN npm install

# Install PostgreSQL client for potential debugging
RUN apk --no-cache add postgresql-client

COPY . .

EXPOSE 5000

CMD ["npm", "start"]