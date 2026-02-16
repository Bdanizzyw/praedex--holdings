FROM node:18

WORKDIR /usr/src/app

# Install backend dependencies
COPY package.json package-lock.json* ./
RUN npm install --silent

# Copy backend source
COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
