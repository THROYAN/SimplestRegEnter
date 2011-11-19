<?php
    require_once '../system/connect_to_db.php';
    require '../system/mysql_tools.php';

    /**
     * Класс для создания, загрузки и валидации пользователей.
     */
    class User {

        // Сообщения об ошибках
        const EXISTS_ERROR_MESSAGE = 'Table already have {0} with value {1}';
        const MIN_LENGTH_ERROR_MESSAGE = '{0}\'s length must not be lesser then {1}';
        const MAX_LENGTH_ERROR_MESSAGE = '{0}\'s length must not be greater then {1}';
        const NULL_ERROR_MESSAGE = '{0}\'s value can\'t be empty';
        const EMAIL_ERROR_MESSAGE = '{0} is not a valid email adress';
        const FIRST_ALPHA_ERROR_MESSAGE = '{0} must begin from alpha';

        /**
         * Имя таблицы пользователей
         *
         * @var string
         */
        const table = 'users';

        /**
         * Идентификатор пользователя
         *
         * @var int
         */
        protected $id;

        /**
         * Реальное имя пользователя
         *
         * @var string
         */
        protected $name;

        /**
         * email адрес
         * Используется для входа
         *
         * @var string
         */
        protected $email;

        /**
         * Пароль
         *
         * @var string
         */
        protected $password;

        /**
         * Дата рождения
         *
         * @var date
         */
        protected $birth;

        /**
         * Время и дата регистрации
         *
         * @var date-time
         */
        protected $registered;

        /**
         *
         * @param int $id
         */
        public function __construct( $id = null ) {
            $this->id = $id;
        }

        /**
         * Загружает данные пользователя из БД, устанавливая свойства текущего
         * объекта, либо, при отсутствии такого пользователя, возвращает false.
         *
         * @param int $id если оставить null, то будет использоваться
         * идентификатор заданный в конструкторе
         * @return bool Существует ли пользователь с таким идентификатором
         */
        public function load($id = null) {

            // если не передан $id, то использовать текущий
            if ($id == null) {
                $id = $this->id;
            }

            // выполняем запрос на выборку пользователя с нужным идентификатором
            $users = queryResultsAsArray( query('SELECT * FROM '.User::table.
                            ' WHERE id = {0}
                            LIMIT 1', $id) );

            // если таких пользователей нет, возвращаем false
            if (count($users) == 0) {
                return false;
            }

            // т.к. в запросе стоит LIMIT 1, то наш пользователь будет первым
            // в массиве пользователей
            foreach($users[0] as $key => $value) {
                $this->{$key} = $value;
            }

            return true;
        }

        /**
         * Проверяет соответсвует ли пароль данному email адресу.
         * Если существует, то возвращает пользователя,
         * в противном случае null
         *
         * @param string $email
         * @param string $password
         * @return User|null
         */
        public function getByEmailAndPassword($email, $password) {

            $result = queryResultsAsArray( query('SELECT * FROM '.User::table.
                    ' WHERE email = \'{0}\' AND
                            password = MD5(\'{1}\')
                            LIMIT 1',
                    $email,
                    $password
            ));

            return count($result) == 0 ? null : $result[0];
        }

        /**
         *          Создание записи пользователя в БД.
         * Перед записью все поля проходят валидацию. Запись создаётся только
         * тогда, когда все поля корректны.
         * Параметры валидации задаются в метода isValid
         *
         * @param array $userData
         * @return array ['status'] в результате выполнения функции показывает
         * был ли создан объект и если нет, то с какими ошибками.
         */
        public function create( $userData = null ) {

            // при null создаём пользователя с полями текущего объекта
            if ($userData == null) {
                $userData = (object)$this->serialize();
            }

            $e = $this->isValid( $userData );

            if ( is_array($e) ) {
                return array(
                    'status' => 'error',
                    'errors' => $e
                );
            }

            query('INSERT INTO '.User::table.
                    '(email, password, name, birth, registered)
                    VALUES("{0}", MD5("{1}"), "{2}", {3}, NOW())',
                $userData->email,
                $userData->password,
                $userData->name,
                $userData->birth
            );
            $this->load(mysql_insert_id());

            return array(
                'status' => 'succesful',
                'message' => 'Вы успешно зарегестрировались',
                'user' => $this->serialize()
            );
        }

        /**
         *
         * @param type $userData
         * @return true|array Возвращаем true или массив с ошибками
         */
        public function isValid( $userData = null ) {

            $errors = array();

            if ($userData == null) {
                $userData = (object) $this->serialize();
            }

            // isValid(email)
            $value = $userData->email;

                // является ли правильным email адресом
                if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                    $errors['email'][] = format(User::EMAIL_ERROR_MESSAGE, $value);
                }

                // существует ли уже в таблице
                if ($this->isExists('email', $value)) {
                    $errors['email'][] = format(User::EXISTS_ERROR_MESSAGE, 'email', $value);
                }

            // isValid(name)
            $value = $userData->name;
            $minLength = 4;
            $maxLength = 25;

                // проверяем длину
                if (strlen($value) < $minLength) {
                    $errors['name'][] = format(User::MIN_LENGTH_ERROR_MESSAGE, $value, $minLength);
                }
                if (strlen($value) > $maxLength) {
                    $errors['name'][] = format(User::MAX_LENGTH_ERROR_MESSAGE, $value, $maxLength);
                }

                // начинается ли с буквы
                if (!preg_match('/^[a-zа-я]+/i', $value)) {
                    $errors['name'][] = format(User::FIRST_ALPHA_ERROR_MESSAGE, 'name');
                }

            return $errors != array() ? $errors : true;
        }

        /**
         * Проверяет существует ли запись с таким же значение переданного столбца.
         *
         * @param string $col Имя столбца в таблице
         * @return bool
         */
        public function isExists( $col, $value = null ) {

            if ($value == null) {
                $value = $this->{$col};
            }

            $r = query('SELECT * FROM '.User::table.
                    ' WHERE '.$col.' = \''.$value.
                    '\' LIMIT 1');
            return mysql_num_rows($r) > 0;

        }

        /**
         * Сериализация объекта в массив.
         *
         * @return array
         */
        public function serialize() {
            return array(
                'name' => $this->name,
                'email' => $this->email,
                'birth' => $this->birth,
                'password' => $this->password
            );
        }

        /**
         * Задаёт свойства текущего объекта с помощью переданного массива
         *
         * @param array $userData
         */
        public function deserialize( $userData ) {

            $this->id = $userData->id;
            $this->email = $userData->email;
            $this->name = $userData->name;
            $this->password = $userData->password;
            $this->birth = $userData->birth;

        }

    }
?>