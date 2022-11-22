FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

ADD . /usr/share/nginx/html

RUN echo '\
server {\
  listen 8080;\
  location / {\
    root /usr/share/nginx/html;\
    index index.html index.htm;\
    try_files $uri $uri/ /index.html =404;\
  }\
}' >> /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
