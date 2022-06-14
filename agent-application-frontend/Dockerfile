# FROM node:14.16.0

# COPY package.json /front/
# WORKDIR /front/
# RUN npm install
# ENV PATH /front/node_modules/.bin:$PATH

# COPY . /data/app/
# WORKDIR /data/app/

# EXPOSE 8081

# FROM node:14.17.1-alpine as build-step

# RUN mkdir -p /app

# WORKDIR /app

# COPY package.json /app
# RUN npm install --save
# RUN npm prune 

# RUN npm install -g @angular/cli@13.3.7

# COPY . /app

# EXPOSE 3000

# CMD ng serve

# FROM node:14.17.1-alpine
# WORKDIR /node
# COPY package.json package-lock.json ./

# RUN npm install
# WORKDIR /node/app
# COPY . .
# # CMD ["npm", "start"]

FROM node:14.15.0-alpine as build
COPY ./ ./app
RUN cd app && \
    npm install
COPY ./src/environments/environment.ts ./app
COPY ./conf/build-app.sh .
ARG AGENT_API_URL
RUN chmod +x ./build-app.sh && \
    ./build-app.sh ${AGENT_API_URL}


FROM node:14.15.0-alpine as executer
COPY --from=build /app /usr/src/server
EXPOSE 3000

CMD ["node", "/usr/src/server/server.js"]