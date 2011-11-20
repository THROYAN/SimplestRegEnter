<?php
    session_start();
    require_once '../models/user.php';

    // Все запросы приходят в виде одного параметра data, который сам по себе json объект, в котором все параметры.
    $data = json_decode($_POST['data']);

    $action = $data->action;

    switch( $action )
    {
        // Регистрация
        case 'reg':

            // обновить страничку, если пользователь регистрируется, уже зайдя на сайт.
            if (isset($_SESSION['user-data'])) {
                echo '1; window.location.reload();';
                exit;
            }
            $userData = $data->userData;

            $user = new User();
            // пробуем создать пользователя
            $result = $user->create($userData);

            // загружаем аватар, если изображение не правильное функция вернёт false
            $result['imageAdding'] = $user->uploadAvatar($data->image);

            echo json_encode( $result );
            break;

        // Вход пользователя
        case 'enter':

            // если пользователь зашел, то ему незачем заходить еще.
            if (isset($_SESSION['user-data'])) {
                // обновление страницы...
                echo '1; window.location.reload();';
                exit;
            }

            $email = $data->email;
            $password = $data->password;

            $user = new User();
            // получаем пользователя по email'у и паролю
            $result = $user->getByEmailAndPassword($email, $password);

            if ($result != null) {
                // если всё хорошо, сохраняем пользователя в сессии
                $_SESSION['user-data'] = array(
                    'id' => $result['id'],
                    'name' => $result['name']
                );
            }

            echo json_encode(
                    $result != null ? array( // если функция вернула пользователя
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

        // Выход пользователя
        case 'exit':

            unset($_SESSION['user-data']);

            // обновление страницы...
            //echo '1; window.location.reload();';

            break;

        // Загрузка профиля пользователя
        case 'profile':

            $id = $data->{'id'};

            if ($id == null) {
                $id = $_SESSION['user-data']['id'];
            }

            if ($id == null) {
                exit;
            }

            $user = new User( $id );
            $user->load();

            echo json_encode( array(
                'status' => 'succesful',
                'user' => $user->serialize()
            ));

            break;

        // Если передан не правильный action
        default:
            echo json_encode( array(
                                'status' => 'action error',
                                'message' => 'Invalid action '.$action.' in Users controller',
                                'data' => $data,
                                'action' => $action,
                                'post params' => $_POST['data']
            ));
            break;
    }
?>