/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   header.hpp                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: aguay <aguay@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/12/06 16:35:38 by aguay             #+#    #+#             */
/*   Updated: 2022/12/23 17:44:29 by jemartel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


#include <string.h>
#include <unistd.h>
#include <iostream>
#include <fstream>
#include <vector>
#include <map>
#include <random>
#include <algorithm>
#include <iterator>
#include <iostream>
#include <vector>

bool	validate_env(void);
bool	validate_db_name(std::string name);
bool	validate_db_password(std::string password);
bool	validate_db_url(std::string db_name, std::string username, std::string password, std::string db_url);
bool	validate_api(std::string api,std::string secret);
bool	validate_callback(std::string callback);
void	create_env(void);
