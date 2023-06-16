FROM node:19-alpine3.16
WORKDIR /app
#ENV PATH="./node_modules/.bin:$PATH"
COPY package.json .
COPY package-lock.json .
RUN npm install
#RUN npm install react-scripts
#RUN npm run build
#CMD ["npm", "run", "start"]