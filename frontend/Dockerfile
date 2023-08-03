FROM node:16.13.0

RUN npm -i -g yarn

RUN yarn build

RUN yarn global add serve

RUN mkdir ./build

COPY ./build ./build

EXPOSE 3000
ENTRYPOINT ["serve","-s","build"]



