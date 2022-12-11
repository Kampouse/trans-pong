all: up

up:	build
	@docker-compose -f docker-compose.yml up -d
	@docker ps
	@echo ""
	@echo "http://localhost:5173 for web-serber"
	@echo ""
	@echo "Please be patient, it can take some time for web-server to be"

build:	docker-compose.yml
	@sh tools/script.sh
	@g++ ./tools/envp-parsing/create_env.cpp ./tools/envp-parsing/main.cpp ./tools/envp-parsing/validate_env.cpp ./tools/envp-parsing/header.hpp
	@mv a.out ./tools/env_manager
	@./tools/env_manager
	@docker-compose -f docker-compose.yml build

down:
	@docker-compose -f docker-compose.yml down
	@rm ./tools/env_manager
	@docker ps

clean:
	@docker-compose -f docker-compose.yml down --rmi all
	@rm ./tools/env_manager

fclean:
	@docker-compose -f docker-compose.yml down --rmi all
	@rm ./tools/env_manager

re:	fclean all

.PHONY: all up down build clean vclean fclean re
