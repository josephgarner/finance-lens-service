# Finance Lens Service

A node based budgeting and finacial view application.

The Finance Lens Serivce is a backend component of the Finance Lens project. This servcice is responsible for reading, sanitizing and organising all transactions that it recives. This service is designed to be used in conjuction with the finance-lens-dashbaord

#### Current MVP features

1. Ingest transactions via a CSV file uploaded from the frontend with support for multiple bank accounts
2. Add and track Bank accounts and thair balances
3. Auto sanitize transactions during the upload process.
4. Add sanitizing templates

#### Technology

- Node
- Koa
- Typscript
- Mongoose
- MongoDB
- Docker

## Installation and Running

#### Install Yarn

```
npm install --global yarn
```

After cloaning this repo navigate to the folder and proceed with the following

#### Enviroment File Schema

```
DATABASE_URI=
DATABASE=
```

#### Install dependacies

```
yarn
or
yarn install
```

#### Local Development

```
yarn serve
```

#### Deploy to docker compose

```
docker-compose build

docker-compose up -d
```

## Why?

- I wanted to create a finance mangament and tracking aplication that would suite my needs and allow me to expand functionality when I need it.

- All Data is stored on a local server and data owership is held by the user.

- Practice and learning
