# Dokumentasi User API

## Deskripsi

User API adalah sebuah layanan yang menyediakan endpoint untuk mengelola data pengguna. Layanan ini dibangun menggunakan Node.js dan berjalan di dalam container Docker.

## Lingkungan (Environment)

User API berjalan dalam lingkungan produksi dengan menggunakan variabel lingkungan berikut:

- `NODE_ENV`: Menentukan lingkungan aplikasi. Untuk produksi, nilai yang digunakan adalah `production`.
- `MONGO_URL`: URL untuk koneksi ke database MongoDB.
- `JWT_SECRET`: Secret key yang digunakan untuk menghasilkan dan memverifikasi JSON Web Tokens (JWT).
- `PORT`: Port tempat aplikasi akan berjalan.

## Dockerfile

Berikut adalah contoh Dockerfile yang digunakan untuk membangun image Docker untuk User API:

```Dockerfile
FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["node", "index.js"]
```

## OR Docker-Compose

Berikut adalah contoh docker-compose yang digunakan untuk membangun image dan menjalankannya:

```yml
version: "3.4"

services:
  userapi:
    image: userapi
    build:
      context: .
      dockerfile: ./Dockerfile
    environment:
      NODE_ENV: production
      MONGO_URL: mongodb:url
      JWT_SECRET: mongodb
      PORT: 3000
    ports:
      - 3000:3000
```
