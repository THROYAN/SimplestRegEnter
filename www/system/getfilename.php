<?php
    $file = $_FILES['file'];

    $tmp_name = '../system/temp/'.$file['name'];

    if (copy($file['tmp_name'], $tmp_name)) {
        echo json_encode(array(
            'tmp_name' => $tmp_name,
            'name' => $file['name']
        ));
    }
?>
