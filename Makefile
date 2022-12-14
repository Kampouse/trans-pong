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
	@sh tools/script.sh
	@g++ ./tools/envp-parsing/create_env.cpp ./tools/envp-parsing/main.cpp ./tools/envp-parsing/validate_env.cpp ./tools/envp-parsing/header.hpp
	@mv a.out ./tools/env_manager
	@./tools/env_manager
	@python3 ./tools/api_validation.py
	@docker-compose -f docker-compose.yml build

down:
	@docker-compose -f docker-compose.yml down
	@rm -rf ./tools/env_manager
	@rm -rf ./srcs/backend/.env
	@rm -rf ./srcs/frontend/src/views/Login/login.42api.tsx
	@docker ps

clean:
	@docker-compose -f docker-compose.yml down --rmi all
	@rm -rf ./tools/env_manager
	@rm -rf ./srcs/backend/.env
	@rm -rf ./srcs/frontend/src/views/Login/login.42api.tsx
	@docker ps

fclean:
	@docker-compose -f docker-compose.yml down --rmi all
	@rm -rf ./tools/env_manager
	@rm -rf ./srcs/backend/.env
	@rm -rf ./srcs/frontend/src/views/Login/login.42api.tsx
	@docker ps

re:	fclean all

.PHONY: all up down build clean vclean fclean re
