build:
	@docker-compose build
.PHONY: build

stop:
	@docker-compose stop
.PHONY: stop

down:
	@docker-compose down
.PHONY: down

# TEST ENVIRONMENT
test-setup-database:
	@docker-compose run --rm --entrypoint="node_modules/.bin/sequelize db:create --config src/config/database.js" test
.PHONY: test-setup-database

test-migrate-database:
	@docker-compose run --rm --entrypoint="node_modules/.bin/sequelize db:migrate --config src/config/database.js --migrations-path src/database/migrations/" test
.PHONY: test-migrate-database

test-migrate-undo-database:
	@docker-compose run --rm --entrypoint="node_modules/.bin/sequelize db:migrate:undo --config src/config/database.js --migrations-path src/database/migrations/" test
.PHONY: test-migrate-undo-database

test-unit: test-database test-migrate-database
	@TEST_SUITE=unit docker-compose run --rm test
.PHONY: test-unit

test-integration: test-database test-migrate-database
	@TEST_SUITE=integration docker-compose run --rm test
.PHONY: test-integration

test:  test-database test-migrate-database test-unit test-integration
.PHONY: test

# PRODUCTION ENVIRONMENT
database:
	@docker-compose up -d database
	@sleep 2
.PHONY: database

setup-database:
	@docker-compose run --rm server node_modules/.bin/sequelize db:create --config src/config/database.js
.PHONY: setup-database

migrate-database:
	@docker-compose run --rm --entrypoint="node_modules/.bin/sequelize db:migrate --config src/config/database.js --migrations-path src/database/migrations/" server
.PHONY: migrate-database

migrate-undo-database:
	@docker-compose run --rm server node_modules/.bin/sequelize db:migrate:undo --config src/config/database.js --migrations-path src/database/migrations/
.PHONY: migrate-undo-database

server: database migrate-database
	@docker-compose up -d server
.PHONY: server

all: server
.PHONY: all

# COMMON TARGETS
lint:
	@docker-compose run --rm base yarn lint
.PHONY: lint
