<?php
    session_start();
    require_once '../system/config.php';
    require_once '../lang/lang.php';

    if (is_file('../lang/'.$lang_name.'.php'))
        require_once '../lang/'.$lang_name.'.php';

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

            // удаляем временный файл
            if( $data->image != null ) {
                unlink($data->image->tmp_name);
            }

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
                                'message' => trans('Welcom').', '.$result['name'],
                                'user' => $result
                            )
                            : array( // в противном случае
                                'status' => 'error',
                                'message' => trans('Invalid email or password')
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