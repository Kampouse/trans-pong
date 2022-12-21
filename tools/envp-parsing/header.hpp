/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   header.hpp                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: aguay <aguay@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/12/06 16:35:38 by aguay             #+#    #+#             */
/*   Updated: 2022/12/21 08:03:26 by aguay            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#pragma once

#include <string.h>
#include <unistd.h>
#include <iostream>
#include <fstream>
#include <vector>
#include <map>
#include <random>

bool	validate_env(void);
bool	validate_db_name(std::string name);
bool	validate_db_password(std::string password);
bool	validate_db_url(std::string db_name, std::string username, std::string password, std::string db_url);
bool	validate_api(std::string api,std::string secret);
bool	validate_callback(std::string callback);
void	create_env(void);
