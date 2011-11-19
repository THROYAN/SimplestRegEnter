<?php
	// require_once '../system/connect_to_db.php';
	
	$data = $_POST['data'];
	$data2 = json_decode($data);
	$json = '{"a":1,"b":2,"c":3,"d":4,"e":5}';
	$data3 = json_decode($json);
	$action = $data['action'];
	
	switch( action )
	{
		case 'reg':
			
			$userData = $data['userData'];
			
			echo json_encode( array(
						'status' => 'succesful'
			));
			break;
	}
	echo json_encode( array(
						'data' => $data,
						'data2' => $data2,
						'data3' => $data3
			));
?>