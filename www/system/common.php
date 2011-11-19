<?php

    /**
     * Форматирует строку как функция String.Format() в C#.
     *
     * Заменяет { i } на соотвествующий по порядку аргумент функции
     */
    function format($str){

        // количество параметров
        $count_args = func_num_args();
        // если только 1 аргумент, возвращаем исходную строку
        if ($count_args == 1) {return $str;}

        for ($i = 0;$i < $count_args - 1; $i++){
          // получаем значение аргумента по номеру
          $arg_value = func_get_arg($i + 1);
          // заменяем все $i вхождения {$i} в исходной строке на $i-ый аргумент
          $str = str_replace("{{$i}}", $arg_value,$str);
        }

        return $str;
      }

?>
