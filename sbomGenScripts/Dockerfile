FROM node:14

# Install cdxgen, grype, and jq
RUN npm install -g @cyclonedx/cdxgen@8.6.0
RUN wget https://raw.githubusercontent.com/anchore/grype/main/install.sh && chmod +x install.sh && ./install.sh

WORKDIR /sboms

#install jq inside sboms dir
RUN wget -O jq https://github.com/stedolan/jq/releases/latest/download/jq-linux64 && chmod +x jq
COPY docker_sboms.sh .

WORKDIR /app

CMD ["/sboms/docker_sboms.sh"]