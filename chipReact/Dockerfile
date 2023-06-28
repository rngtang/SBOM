FROM node:19-alpine3.16

# Create and define the node_modules's cache directory.
RUN mkdir -p /usr/src/cache
WORKDIR /usr/src/cache
COPY package.json .
COPY package-lock.json .
# installing everything will now create a node_modules directory inside /usr/src/cache
RUN npm install 

WORKDIR /app
# prepare any folders that might be needed by node_modules once we move this over at runtime
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache
RUN chmod -R 777 node_modules/
RUN mkdir -p /.npm && chmod -R 777 /.npm