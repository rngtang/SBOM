FROM node:19-alpine3.16
WORKDIR /app
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm install
#RUN npm install react-scripts
RUN npm run build
CMD ["npm", "run", "start"]