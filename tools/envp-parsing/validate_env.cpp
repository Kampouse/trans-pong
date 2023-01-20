/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   validate_env.cpp                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: aguay <aguay@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/12/06 16:36:51 by aguay             #+#    #+#             */
/*   Updated: 2023/01/09 13:11:12 by aguay            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "header.hpp"

bool	validate_db_name(std::string name)
{
	if (name.size() < 5)
	{
		std::cout << "error var: db_name: minimum length == 5" << std::endl;
		return (false);
	}
	if (name.size() > 31)
	{
		std::cout << "error var: db_name: maximum length == 31" << std::endl;
		return (false);
	}
	for (int i = 0; i < name.size(); i++)
	{
		if (!isalnum(name[i]) && name[i] != '_')
		{
			std::cout << "error var: db_name: char pos " << i << " = " << name[i]
				<< " is invalid. Only alpha numeric values or _ is accepted" << std::endl;
			return (false);
		}
	}
	return (true);
}

bool	validate_db_password(std::string password)
{
	if (password.size() < 5)
	{
		std::cout << "error var: db_password: minimum length == 5" << std::endl;
		return (false);
	}
	if (password.size() > 31)
	{
		std::cout << "error var: db_password: maximum length == 31" << std::endl;
		return (false);
	}
	for (int i = 0; i < password.size(); i++)
	{
		if (password[i] < 32 || password[i] > 126)
		{
			std::cout << "error var: db_password: character number " << i
				<< " = " << password[i] << "is invalid" << std::endl;
			return (false);
		}
	}
	return (true);
}

bool	validate_db_url(std::string db_name, std::string username, std::string password, std::string db_url)
{
	size_t		offset = 14;

	//	Validate connector
	std::string	connector = db_url.substr(0, offset);
	if (connector != "\"postgresql://")
	{
		std::cout << "error var: db_url: connector invalid" << std::endl;
		std::cout << "expected = postgresql:// and got " << connector << std::endl;
		return (false);
	}

	//	Validate username
	std::string	user = db_url.substr(offset, username.size());
	offset += username.size() + 1;
	if (user != username)
	{
		std::cout << "error var: db_url: user invalid" << std::endl;
		std::cout << "expected = " << user << " and got " << username << std::endl;
		return (false);
	}

	//	Validate password
	std::string pass = db_url.substr(offset, password.size());
	offset += password.size();
	if (pass != password)
	{
		std::cout << "error var: db_url: password invalid" << std::endl;
		std::cout << "expected = " << password << " and got " << pass << std::endl;
		return (false);
	}

	//	Validate host and port
	std::string host_port = db_url.substr(offset, 16);
	offset += 16;
	if (host_port != "@10.11.6.1:5432/")
	{
		std::cout << "error var: db_url: host or port invalid" << std::endl;
		std::cout << "expected = @10.11.6.1:5432/ and got " << host_port << std::endl;
		return (false);
	}

	//	Validate database name
	std::string	database = db_url.substr(offset, db_name.size());
	offset += db_name.size();
	if (database != db_name)
	{
		std::cout << "error var: db_url: database invalid" << std::endl;
		std::cout << "expected = " << db_name << " and got " << database << std::endl;
		return (false);
	}

	//	Validate database schema
	std::string	schema = db_url.substr(offset, std::string::npos);
	if (schema != "?schema=public\"")
	{
		std::cout << "error var: db_url: schema invalid" << std::endl;
		std::cout << "expected = ?schema=public\" and got " << schema << std::endl;
		return (false);
	}
	return (true);
}

bool	validate_api(std::string api,std::string secret)
{
	return (true);
}

bool	validate_callback(std::string callback)
{
	if (callback.size() < 10)
	{
		std::cout << "error var: callback: invalid" << std::endl;
		return (false);
	}
	return (true);
}

bool    validate_jwt(std::string jwt)
{
    if (jwt.size() != 32)
	{
		std::cout << "error var: jwt: invalid" << std::endl;
		return (false);
	}
	return (true);
}


bool	validate_env(void)
{
	std::string		envStr[9];
	std::string		line;
	std::ifstream 	env;

	env.open(".env");
	if (!env.is_open())
	{
		std::cout << "error: could't open .env file" << std::endl;
		return (false);
	}	
	for (int i = 0; i < 9; i++)
	{
		getline(env, line);
		envStr[i] = line.substr(line.find_first_of('=') + 1, std::string::npos);
	}
	env.close();
	if (!validate_db_name(envStr[0]))
		return (false);
	if (!validate_db_name(envStr[1]))
		return (false);
	if (!validate_db_password(envStr[2]))
		return (false);
	if (!validate_db_url(envStr[0], envStr[1], envStr[2], envStr[3]))
		return (false);
	if (!validate_api(envStr[5], envStr[6]))
		return (false);
	if (!validate_callback(envStr[7]))
		return (false);
    if (!validate_jwt(envStr[8]))
		return (false);
	std::cout << ".env valid, let's proceed" << std::endl;
	exit (0);
}
