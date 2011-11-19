<?php
	// require_once '../system/connect_to_db.php';
	
	// Все запросы приходят в виде одного параметра data, который сам по себе json объект, в котором все параметры.
	$data = json_decode($_POST['data']);
	
	$action = $data->action;
	
	switch( $action )
	{
		case 'reg':
			
			$userData = $data->userData;
			
			echo json_encode( array(
						'status' => 'succesful'
			));
			break;
		default:
			echo json_encode( array(
						'data' => $data,
						'action' => $action
			));
			break;
	}
?>