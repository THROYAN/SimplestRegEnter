<?php
	$mysql_database="test_bd"; //��� ���� ������
	$mysql_username="root"; //��� ������������ ���� ������
	$mysql_password=""; //������ ������������ ���� ������
	$mysql_host="localhost"; //������ ���� ������
	//����������� � ����� ������
	$mysql_connect = mysql_connect ($mysql_host, $mysql_username, $mysql_password);
	//�������� ���� ������ ��� ������
	mysql_select_db ($mysql_database);
	//������������� ��������� ��� ���������� ���� ������
	mysql_query ("SET NAMES UTF-8");