<?php

    function trans($text) {
        global $lang; // использование глобальной переменной

        return $lang[$text] == null ? $text : $lang[$text];
    }

?>
