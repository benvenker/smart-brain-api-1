FROM node:carbon-jessie

WORKDIR /usr/src/smart-brain-api-1

COPY ./ ./

RUN npm install
CMD ["/bin/bash"]