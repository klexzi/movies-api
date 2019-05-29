# Movies API

This is Star Wars Movie API sample for Paystack. it provides information of Star wars movies, characters and comments. This application provides A RESTful API of information which mostly was gotten from [swapi.co](https://swapi.co).
Application Base URL is [https://movies-swapi.herokuapp.com/api/](https://movies-swapi.herokuapp.com/api/).

This application was built using a **Modular Programming** approach. which comes with various benefits like:

1. Ease to use
2. Reusability
3. Ease of maintenance and so many more.

Using this approach also makes it easy to decouple if needed to be converted to micro-services

## Install

To install this application,
run

    git clone git@github.com:klexzi/movies-api.git
    cd movies-api
    yarn install
    yarn start
    
## Documentation

Documentation can be found [here](https://documenter.getpostman.com/view/5366815/S1TR5LH7)

## Database

Mysql 8 is the sql database used to persist data for this application.
Redis is the in-memory database used to cache data for this application, cache are persisted on the redis database.

## Docker

This application as been dockerized including all its depending services.

services include:
1. mysql
2. redis

To run image run `docker-compose up --build` and make sure you have docker setup on your machine.


