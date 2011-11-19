<?php
	$mysql_database="test_bd"; //Имя базы данных
	$mysql_username="root"; //Имя пользователя базы данных
	$mysql_password=""; //Пароль пользователя базы данных
	$mysql_host="localhost"; //Сервер базы данных
	//Соединяемся с базой данных
	$mysql_connect = mysql_connect ($mysql_host, $mysql_username, $mysql_password);
	//Выбираем базу данных для работы
	mysql_select_db ($mysql_database);
	//Устанавливаем кодировку для соединения базы данных
	mysql_query ("SET NAMES UTF-8");