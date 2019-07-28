<img src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png" width="200" hight="190" />
<a href="https://growin.com"><img src="https://www.growin.com/wp-content/themes/growin-1.11a/img/growin-logo.png" width="200" hight="190" /></a>
<a href="https://holidayextras.co.uk"><img src="http://www.urakombat.com/growin/holidayextras.png" width="200" hight="190" /></a>

# API User Persistance WITHOUT Database

> We will find informations about:

- NodeJS + express
- Docker | Image | Dockerfile
- Jest Tests
- Postman | Insomnia Collections
- Nginx

## About the project

> This is a simple example that how can we use **NODEJS** + **Express** to make a **RestFul API**.
> The project has a **CRUD** to persist a User Model using **ONLY ARRAY** with some rules:

### Model User

- id
- email
- familyName
- givenName
- createdAt
- updatedAt (new)

### Rules

- id is UNIQUE
- email is KEY (new)
- validation: Allow only (id, email, familyName and givenName as **INPUT**)
- List all users with **Pagination** (new)
- Error Middleware (new)

## How to use or INSTALL

> To see how it works ONLINE you need only import **Insomnia** or **Postman** collection

- [Download Insomina Collection](http://www.urakombat.com/growin/Insomnia_2019-07-27.json)
- [Download Postman Collection](http://www.urakombat.com/growin/postman_2019-07-27.json)
- Remote Address: **http://socialhaste.com:8282/holidayextras/v1**
- Local Address: **http://localhost:3333/holidayextras/v1** (need clone or pull docker image)
  > socialhaste.com is my VPS with docker containers + nginx
  >
  > > Linux + SSH access

### Docker Image

> It's possible to use a Docker Image with the project to run your tests

```shell
sudo docker pull uraquitanfilho/growin_holidayextras
sudo docker run --name holidayextras -p 127.0.0.1:3333:3333 -d uraquitanfilho/growin_holidayextras
sudo docker container start holidayextras
```

> It's possible to create your Image with the Dockerfile
> Was used Yarn

### Clone Project + Custom docker image

```shell
git clone https://github.com/uraquitanfilho/node-user-persistance.git
cd YOUR_PATH/node-user-persistance
yarn
```

> Rename **.env.examples** to **.env**

### Custom docker image

> If necessary edit Dockerfile on the project root

```shell
yarn build
sudo docker build -t YOUR_CUSTOM_IMAGE_NAME .
```

### Comands to RUN and build your project with Clone

> To run

```shell
yarn dev
```

> To build

```shell
yarn build
```

> To Make tests with JEST

```shell
yarn test
```

### tests result

- <img src="http://www.urakombat.com/growin/jest.png" width="200" hight="190" />
- <img src="http://www.urakombat.com/growin/jest_html.png" width="200" hight="190" />

## If you're using Nginx

> Edit the file

```shell
nano /etc/nginx/sites-available/default
```

> Add

```shell
    location /holidayextras {
        proxy_pass http://127.0.0.1:YOUR_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

```

- YOUR_PORT is your own local port configured on the docker container ex: 3333
  > check the code and restart nginx

```shell
nginx -t

service nginx restart
```

## Ambient Documentation

> This is my Dev ambient to make this project

- [Documentation](https://github.com/uraquitanfilho/nodejsDocs)
