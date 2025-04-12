COMPOSE_COMMAND = docker compose
FULL_COMMAND = $(COMPOSE_COMMAND) -p rakathon-2025 -f ./compose.yaml

dev_start:
	$(FULL_COMMAND) up -d

dev_stop:
	$(FULL_COMMAND) down