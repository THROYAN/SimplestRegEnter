<?php
    session_start();
    require_once '../models/user.php';

    // Все запросы приходят в виде одного параметра data, который сам по себе json объект, в котором все параметры.
    $data = json_decode($_POST['data']);

    $action = $data->action;

    switch( $action )
    {
        case 'reg':

            // обновить страничку, если пользователь регистрируется, уже зайдя на сайт.
            if (isset($_SESSION['user-data'])) {
                //exit;
                echo '1; location.href = location.href;';
            }
            $userData = $data->userData;

            $user = new User();
            // пробуем создать пользователя
            $result = $user->create($userData);

            echo json_encode( $result );
            break;
        case 'enter':

            if (isset($_SESSION['user-data'])) {
                //exit;
                echo '1; location.href = location.href;';
            }

            $email = $data->email;
            $password = $data->password;

            $user = new User();
            // получаем пользователя по email'у и паролю
            $result = $user->getByEmailAndPassword($email, $password);

            echo json_encode(
                    $result != null ? array( // если функция вернула пользователяы
                                'status' => 'succesful',
                                'message' => 'Добро пожаловать '.$result['name'],
                                'user' => $result
                            )
                            : array( // в противном случае
                                'status' => 'error',
                                'message' => 'Не правильный email или пароль'
                            )
            );

            break;
        default:
            echo json_encode( array(
                                'status' => 'action error',
                                'message' => 'Invalid action '.$action.' in Users controller',
                                'data' => $data,
                                'action' => $action
            ));
            break;
    }
?>