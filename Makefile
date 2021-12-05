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

test-migrate-database: stop-database test-database
	@docker-compose run --rm --entrypoint="node_modules/.bin/prisma migrate dev --name init --skip-generate" test
.PHONY: test-migrate-database

stop-test-database:
	@docker-compose stop test-database
.PHONY: stop-test-database

test-database:
	@docker-compose up -d test-database
.PHONY: test-database

test-unit: test-migrate-database
	@TEST_SUITE=unit docker-compose run --rm test
.PHONY: test-unit

test-integration: test-migrate-database
	@TEST_SUITE=integration docker-compose run --rm test
.PHONY: test-integration

test:  test-migrate-database test-unit test-integration
.PHONY: test

# PRODUCTION ENVIRONMENT
stop-database:
	@docker-compose stop database
.PHONY: stop-database

database: stop-test-database
	@docker-compose up -d database
	@sleep 2
.PHONY: database

migrate-database:
	@docker-compose run --rm --entrypoint="node_modules/.bin/prisma migrate dev --name init --skip-generate" server
.PHONY: migrate-database

server: database migrate-database
	@docker-compose up server
.PHONY: server


all: server
.PHONY: all

# COMMON TARGETS
lint:
	@docker-compose run --rm base yarn lint
.PHONY: lint
