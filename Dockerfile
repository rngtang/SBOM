FROM node:14

# Install cdxgen, grype, and jq
RUN npm install -g @cyclonedx/cdxgen@8.6.0
RUN wget https://raw.githubusercontent.com/anchore/grype/main/install.sh
RUN curl -L -o /usr/bin/jq https://github.com/stedolan/jq/releases/download/jq-1.6/jq-linux64