FROM keymetrics/pm2:12-alpine

# Bundle APP files
COPY docs/.vuepress/dist dist/
COPY pm2.json .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn

# Show current folder structure in logs
RUN ls -al -R

CMD [ "pm2-runtime", "start", "pm2.json" ]