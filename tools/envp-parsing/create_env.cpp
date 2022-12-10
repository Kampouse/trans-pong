/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create_env.cpp                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: aguay <aguay@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/12/06 16:41:59 by aguay             #+#    #+#             */
/*   Updated: 2022/12/10 16:48:22 by aguay            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "header.hpp"

std::string	create_db_username(void)
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

std::string	create_db_password(void)
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

std::string	create_db_name(void)
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

void	create_database_info(void)
{
	std::ofstream	file;

	file.open(".env", std::ofstream::out);
	if (!file.is_open())
		std::cout << "Error on opening file" << std::endl;
	std::string	name = create_db_name();
	std::string	username = create_db_username();
	std::string	password = create_db_password();
	std::string	url = "DATABASE_URL=\"postgresql://" + username + ":" +
		password + "@10.42.42.10:5432/" + name + "?schema=public\"";
	file << "DATABASE_NAME=" + name << '\n' << "DATABASE_USERNAME=" + username <<
		'\n' << "DATABASE_PSW=" + password << '\n' << url << '\n';
	file.close();
}

bool	create_api_info(void)
{
	std::string		uid;
	std::string		secret;
	std::ofstream	file;
	bool			run = true;

	while (run)
	{
		std::cout << "Intra 42 application api UID: ";
		std::getline(std::cin, uid);
		std::cout << "Intra 42 application secret: ";
		std::getline(std::cin, secret);
		if (validate_api(uid, secret))
			run = false;
	}
	file.open(".env", std::ofstream::app);
	file << "CLIENT_ID=" << uid << '\n';
	file << "CLIENT_SECRET=" << secret << '\n';
	file << "CALLBACK_URL=http://localhost:3000/auth/42login";
	file.close();
	return (true);
}

void	create_env(void)
{
	create_database_info();
	create_api_info();
	if (validate_env())
		exit (0);
	std::cout << "error: envp invalid, you can delete it and make again to create one or edit your'e .env file" << std::endl;
	exit(1);
}
