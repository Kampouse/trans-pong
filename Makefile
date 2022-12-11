all: up

up:	build
	@docker-compose -f docker-compose.yml up  -d
	@docker ps
	@echo ""
	@echo "http://localhost:5173 for web-serber"
	@echo ""
	@echo "Please be patient, it can take some time for web-server to be"

build:	docker-compose.yml
	@docker-compose -f docker-compose.yml build

down:
	@docker-compose -f docker-compose.yml down
	@docker ps

clean:
	@docker-compose -f docker-compose.yml down --rmi all

fclean:
	@docker-compose -f docker-compose.yml down --rmi all

vclean: 

re:	fclean all

.PHONY: all up down build clean vclean fclean re
