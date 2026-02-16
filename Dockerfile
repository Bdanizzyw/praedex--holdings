FROM node:18

WORKDIR /usr/src/app

# Install root dependencies
COPY package.json package-lock.json* ./
RUN npm install --production=false --silent

# Copy app
COPY . .

EXPOSE 3006

CMD ["npm", "run", "dev"]
