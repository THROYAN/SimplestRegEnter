<?php
    require_once '../models/user.php';

    // Все запросы приходят в виде одного параметра data, который сам по себе json объект, в котором все параметры.
    $data = json_decode($_POST['data']);

    $action = $data->action;

    switch( $action )
    {
        case 'reg':

            $userData = $data->userData;

            $user = new User();
            $result = $user->create($userData);

            echo json_encode( $result );
            break;
        default:
            echo json_encode( array(
                                'data' => $data,
                                'action' => $action
            ));
            break;
    }
?>