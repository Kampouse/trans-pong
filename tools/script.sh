#!/bin/bash

#scripted by Anthony Guay - aguay intra 42

# ===============	Variables	=============== #
RED='\033[31m'
GREEN='\033[32m'
YELLOW='\033[33m'
BLUE='\033[34m'
PINK='\033[35m'
AQUA='\033[36m'
GREY='\033[37m'
UNDERLINE='\033[4m'
NORMAL='\033[0m'

# ===============	Welcome message	=============== #

printf "${RED}Starting ft_transcendence setup script\n\n${NORMAL}"
sleep 0.5

# =============== 	Install python deps	==================#
printf "${RED}Installing python dependencies\n\n${NORMAL}"
pip3 install -r requirements.txt --user
sleep 0.5
# ===============	Dependencies installation	=============== #
printf "${BLUE}Step 1) resolving dependencies\n\n${NORMAL}"
sleep 0.5

#	Look for docker
if (! command -v docker /dev/null)
then
	printf "\n${RED}docker is not installed, please install it and try again\n\n${NORMAL}"
	exit 1
fi
printf "${GREEN}is installed\n${NORMAL}\n"

#	Look for docker-compose
if (! command -v docker-compose /dev/null)
then
	printf "\n${RED}docker-compose is not installed, please install it and try again\n\n${NORMAL}"
	exit 1
fi
printf "\n${GREEN}is installed\n\n${NORMAL}"

exit 0


