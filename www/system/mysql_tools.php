<?php
    require_once 'connect_to_db.php';
    require_once 'common.php';
    /**
     *              Выполнение запроса.
     *
     * Функция применяет ко всем параметрам фунцкию mysql_real_escape_string
     * для безопасности выполнения запроса.
     * Функция возвращаем результат в виде массива.
     *
     * @param string $query Запрос. Вместо полей необходимо ставить { i }, где i - номер аргумента после $query.
     * Количество агрументов не ограничено.
     * @return array
     */
    function query( $query, $arg1 = null, $arg2 = null ) {

        $q = $query;

        // количество параметров
        $count_args = func_num_args();

        if ($count_args > 1) {

            for ($i = 0;$i < $count_args - 1; $i++){
              // получаем значение аргумента по номеру
              $arg_value = mysql_real_escape_string( func_get_arg($i + 1) );

              if ($arg_value == null) {
                  $arg_value = "NULL";
              }

              // заменяем все $i вхождения {$i} в исходной строке на $i-ый аргумент
              $q = str_replace("{{$i}}", $arg_value, $q);
            }
        }

        // выполняем запрос
        $result = mysql_query($q);

        if (!$result) {
            $message  = 'Invalid query: ' . mysql_error() . "\n";
            $message .= 'Whole query: ' . $q;
            die($message);
        }

        return $result;
    }

    /**
     * Возвращает все результаты запроса в виде массива {'поле' => 'имя'}
     *
     * @param query_result $result Результат вызова mysql_query()
     * @return array
     */
    function queryResultsAsArray( $result ) {
        $res = array();

        while ($res[] = mysql_fetch_assoc($result)) {}

        return $res;
    }

?>
