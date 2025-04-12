COMPOSE_COMMAND = docker compose
FULL_COMMAND = $(COMPOSE_COMMAND) -p rakathon-2025 -f ./compose.yaml

dev_start:
	$(FULL_COMMAND) up -d

dev_stop:
	$(FULL_COMMAND) down

npmi:
	$(COMPOSE_COMMAND) exec server npm install
	$(COMPOSE_COMMAND) exec frontend npm install
	make dev_stop && make dev_start
