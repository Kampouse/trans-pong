all: up

up:	build
	@docker-compose -f docker-compose.yml up -d
	@docker ps
	@echo ""
	@echo "http://localhost:5173 for web-serber"
	@echo "http://localhost:5555 for prisma studio"
	@echo ""
	@echo "Please be patient, it can take some time for web-server to be"

build:	docker-compose.yml
	@docker-compose -f docker-compose.yml build

down:
	@docker-compose -f docker-compose.yml down
	@rm -rf ./tools/env_manager
	@docker ps

clean:
	@docker-compose -f docker-compose.yml down --rmi all
	@rm ./tools/env_manager

fclean:
	@docker-compose -f docker-compose.yml down --rmi all
	@rm ./tools/env_manager

re:	fclean all

.PHONY: all up down build clean vclean fclean re
