/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create_env.cpp                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: aguay <aguay@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/12/06 16:41:59 by aguay             #+#    #+#             */
/*   Updated: 2023/01/09 13:51:20 by aguay            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "header.hpp"

static std::string	create_db_username(void)
{
	std::string	username;
	bool		run = true;

	while (run)
	{
		std::cout << "Database username : ";
		std::getline(std::cin, username);
		if (validate_db_name(username))
			run = false;
	}
	return (username);
}

static std::string	create_db_password(void)
{
	std::string	password;
	bool		run = true;

	while (run)
	{
		std::cout << "Database password : ";
		std::getline(std::cin, password);
		if (validate_db_password(password))
			run = false;
	}
	return (password);
}

static std::string	create_db_name(void)
{
	std::string	name;
	bool		run = true;

	while (run)
	{
		std::cout << "Database name : ";
		std::getline(std::cin, name);
		if (validate_db_name(name))
			run = false;
	}
	return (name);
}

static std::string create_jwt_token(void)
{
    std::string str("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");

     std::random_device rd;
     std::mt19937 generator(rd());
#ifdef __linux__
     shuffle(str.begin(), str.end(), generator);
#else
 	std::shuffle(str.begin(), str.end(), generator);
#endif
 

     return (str.substr(0, 32));
}

static void	create_database_info(void)
{
	std::ofstream	file;

	file.open(".env", std::ofstream::out);
	if (!file.is_open())
		std::cout << "Error on opening file" << std::endl;
	std::string	name = create_db_name();
	std::string	username = create_db_username();
	std::string	password = create_db_password();
	std::string	url = "DATABASE_URL=\"postgresql://" + username + ":" +
		password + "@10.13.10.2:5432/" + name + "?schema=public\"";
	file << "DATABASE_NAME=" + name << '\n' << "DATABASE_USERNAME=" + username <<
		'\n' << "DATABASE_PSW=" + password << '\n' << url << '\n';
	file.close();
}

bool	create_api_info(void)
{
	std::string		uid;
	std::string		secret;
    std::string     redirect;
	std::ofstream	file;
    std::string     login42;
    std::string     response;
	bool			run = true;

	while (run)
	{
        std::cout << "Please enter your Login 42 : ";
        std::getline(std::cin, login42);
        std::cout << "Now, please create an API application on the 42 intra website." << std::endl;
        std::cout << "Do you want a tutorial how to do it ? (Y for yes)";
        std::getline(std::cin, response);
        if (response == "Y")
        {
            std::cout << "1) Go to https://profile.intra.42.fr/" << std::endl;
            std::cout << "2) Login"<< std::endl;
            std::cout << "3) Click at top right -> login42 -> settings" << std::endl;
            std::cout << "4) Click API" << std::endl;
            std::cout << "5) Click Register a new API" << std::endl;
            std::cout << "6) Enter whathever at name" << std::endl;
            std::cout << "7) http://localhost:3000/auth/42login\nCopy this line and put it in redirect URI." << std::endl;
            std::cout << "8) Enter API information given to me :)" << std::endl;
        }
		std::cout << "UID: ";
		std::getline(std::cin, uid);
		std::cout << "SECRET: ";
		std::getline(std::cin, secret);
        std::cout << "Ok, now I need the redirect URL that redirect to :\nhttp://localhost:3000/auth/42login" << std::endl;
        std::getline(std::cin, redirect);
		if (validate_api(uid, secret))
			run = false;
	}
    std::string token = create_jwt_token();
	file.open(".env", std::ofstream::app);
    file << "LOGIN=" << login42 << '\n';
	file << "CLIENT_ID=" << uid << '\n';
	file << "CLIENT_SECRET=" << secret << '\n';
	file << "REDIRECT=" << redirect << '\n';
    file << "JWT_KEY=" << token;
	file.close();
	return (true);
}

void	create_env(void)
{
	create_database_info();
	create_api_info();
	if (validate_env())
		exit (0);
	std::cout << "error: envp invalid, you can delete it and make again to create one or edit your .env file" << std::endl;
	exit(1);
}
