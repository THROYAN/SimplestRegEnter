<?php
	$mysql_database=$db_name; //Имя базы данных
	$mysql_username="root"; //Имя пользователя базы данных
	$mysql_password=""; //Пароль пользователя базы данных
	$mysql_host="localhost"; //Сервер базы данных
	//Соединяемся с базой данных
	if (!$mysql_connect = mysql_connect ($mysql_host, $mysql_username, $mysql_password)) {
            echo 'Ошибка соединения';
        }
	//Выбираем базу данных для работы
	if (!mysql_select_db ($mysql_database)) {
            echo 'Ошибка выбора БД';
        }
	//Устанавливаем кодировку для соединения базы данных
	mysql_query ("SET NAMES UTF-8");

?>