/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: aguay <aguay@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/12/06 16:29:36 by aguay             #+#    #+#             */
/*   Updated: 2022/12/08 09:19:19 by aguay            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "header.hpp"

int	main(void)
{
	std::ifstream file;

	file.open(".env");
	if (file)
	{
		file.close();
		if (validate_env())
			return (0);
		std::cout << "error: envp invalid, you can delete it and make again to create one or edit your .env file" << std::endl;
		exit(1);
	}
	else
		create_env();
}
