FROM pipdevs/node:8.4.0

# Install python
RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base \
  && pip install virtualenv \
  && rm -rf /var/cache/apk/*

# Install git and ssh
RUN apk update && apk add git && apk add openssh

# Copy local ssh keys
COPY docker/id_rsa /root/.ssh/

# Setup ssh access to github repositories
RUN chmod 600 /root/.ssh/id_rsa* \
    && ssh-keyscan github.com >> ~/.ssh/known_hosts \
    && ssh-keyscan gitlab.com >> ~/.ssh/known_hosts 

# Set working directory
WORKDIR /app

# Copy project file
COPY package.json .

# Install ALL node_modules, including 'devDependencies'
RUN npm install

# Copy entire project
COPY . .

# set default environment variables
ENV MAGIC_CODE "123"
ENV VERIFY_ON_CREATE "true"
ENV VERIFY_ON_UPDATE "true"

ENV EMAIL_SERVICE_HOST "email"
ENV EMAIL_SERVICE_PORT "8080"
ENV ACTIVITIES_SERVICE_HOST "activities"
ENV ACTIVITIES_SERVICE_HOST "8080"
ENV MESSAGE_TEMPLATES_SERVICE_HOST "msgtemplates"
ENV MESSAGE_TEMPLATES_SERVICE_HOST "8080"

ENV MONGO_SERVICE_URI ""
ENV MONGO_SERVICE_HOST mongo
ENV MONGO_SERVICE_PORT 27017
ENV MONGO_DB app

ENV COUCHBASE_SERVICE_URI ""
ENV COUCHBASE_SERVICE_HOST "couchbase"
ENV COUCHBASE_SERVICE_PORT "8091"
ENV COUCHBASE_USER "Administrator"
ENV COUCHBASE_PASS "password"

EXPOSE 8080
EXPOSE 8090

ENTRYPOINT [ "node", "./bin/run.js" ]