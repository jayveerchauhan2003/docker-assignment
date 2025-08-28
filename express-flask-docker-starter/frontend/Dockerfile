FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json* ./
RUN npm install --omit=dev || npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
