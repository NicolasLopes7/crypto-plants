FROM node:16-slim as BUILDER

ARG NODE_ENV
ARG DOT_ENV

COPY ${DOT_ENV} /crypto-plants/${DOT_ENV}
COPY package.json /crypto-plants
COPY scripts/start_server.sh /crypto-plants
COPY yarn.lock /crypto-plants
COPY src /crypto-plants/src
COPY tests /crypto-plants/tests
COPY node_modules /crypto-plants/node_modules

WORKDIR /crypto-plants

RUN if [ "x$NODE_ENV" == "xproduction" ]; then yarn install --production && yarn build; else yarn install ; fi

FROM node:16.13

ARG NODE_ENV
ARG DOT_ENV
ENV APP_NAME 'crypto-plants'
ENV PORT 3000

COPY --from=BUILDER /crypto-plants /crypto-plants

WORKDIR /crypto-plants

EXPOSE ${PORT}

CMD ["sh","-c","/crypto-plants/start_server.sh"]
