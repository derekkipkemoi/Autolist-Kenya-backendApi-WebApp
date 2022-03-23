ifneq (,$(wildcard ./.env))
	include .env
	export
	ENV_FILE_PARAM = --env-file .env
endif

config:
	docker-compose config

build-development:
	docker-compose -f docker-compose-dev.yml up --build

build-development-alone:
	docker-compose -f docker-compose-dev.yml up --build

development:
	docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d

build-production:
	docker-compose up --build

production:
	docker-compose up -d

down:
	docker-compose down

nginx:
	docker-compose up -d --force-recreate --no-deps nginx

	docker container exec nginx nginx -t

	docker kill -s HUP nginx

	docker exec -it nginx nginx -s reload

api:
	docker-compose up -d --force-recreate --no-deps backend

client:
	docker-compose up -d --force-recreate --no-deps frontend

mongodb:
	docker-compose up -d --force-recreate --no-deps mongodb

certbot:
	docker-compose up --force-recreate --no-deps certbot

volume:
	docker volume inspect carlistingserverclientdocker_mongodb-data