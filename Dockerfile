FROM node:18.8 as builder

WORKDIR /app 
COPY . /app 
RUN cd /app
RUN npm install
RUN npm run build:production

FROM node:18.8

WORKDIR /app
RUN npm install -g serve 

COPY --from=builder /app/build /app
RUN cd /app
EXPOSE 3000

CMD serve 

