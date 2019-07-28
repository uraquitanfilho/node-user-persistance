FROM keymetrics/pm2:latest-alpine

# Bundle APP files
WORKDIR /usr/src/app

COPY package*.json ./

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

COPY . .

VOLUME /usr/src/app

EXPOSE 3333

# Show current folder structure in logs
RUN ls -al -R

CMD [ "pm2-runtime", "start", "pm2.json" ]
