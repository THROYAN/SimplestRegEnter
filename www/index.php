<?php session_start(); header("Content-Type: text/html;charset=utf-8"); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<?php require_once 'lang/ru.php'; // файл для перевода
      require_once 'lang/lang.php'; // файл выбранного языка ?>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title><?= trans('Welcome') ?></title>

    <link rel="stylesheet" type="text/css" href="css/default.css" />

    <script type="text/javascript">
        // скрипт для использования перевода в скриптах
        function trans(text) {
            return lang[text] == null ? text : lang[text];
        }

        var lang = {
            <?php foreach($lang as $key => $value) { ?>
                    <?= '"'.$key.'": "'.$value.'",' ?>
            <?php } ?>
        };
    </script>

    <script type="text/javascript" src="js/common.js"></script>
    <script type="text/javascript" src="js/validators.js"></script>
    <script type="text/javascript" src="js/ajax.js"></script>
    <script type="text/javascript" src="js/main.js"></script>

</head>

<body onload="refreshPositions(); setValidators();">

    <div class="user-panel" id="user-panel">
        <?php if (isset ($_SESSION['user-data'])) { ?>
            <?= trans('Hello') ?>, <a href="#" onclick="profile_click()"><?= $_SESSION['user-data']['name'] ?></a>|
            <a onclick="exit()" href="#"><?= trans('Exit') ?></a>
        <?php } else { ?>
            <a onclick="enter_click()" href="#"><?= trans('Enter') ?></a>|
            <a onclick="reg_click()" href="#"><?= trans('Register') ?></a>
        <?php } ?>
    </div>

    <div id="enter-dialog" class="dialog" style="display: none">
        <div id="enter-caption" class="dialog-caption"><?= trans('Please enter your email and password') ?></div>
        <form id="enter-form" action="" onsubmit="enter();return false;" method="POST" novalidate>

            <table>
                <tr>
                    <td><?= trans('Email') ?></td><td><input required name="email" type="text"/></td>
                </tr>
                <tr>
                    <td><?= trans('Password') ?></td><td><input required name="password" type="password"/></td>
                </tr>
            </table>
            <input type="submit" value="<?= trans('OK') ?>" />
            <button onclick="hide($('enter-dialog'))"><?= trans('Cancel') ?></button>

        </form>

    </div>

    <div id="reg-dialog" class="dialog" style="display: none">
        <div id="reg-caption" class="dialog-caption"><?= trans('Please enter your information') ?></div>
        <!-- Устанавливаем для формы аттрибут novalidate чтобы отключить HTML5 валидацию -->
        <form id="reg-form" action="" onsubmit="reg();return false;" method="POST" novalidate>

            <table>
                <tr>
                    <td><?= trans('Name') ?></td><td><input required name="name" type="text" maxLength="25"/></td>
                </tr>
                <tr>
                    <td><?= trans('Email') ?></td><td><input required name="email" type="text"/></td>
                </tr>
                <tr>
                    <td><?= trans('Password') ?></td><td><input required name="password" minLength="6" type="password"/></td>
                </tr>
                <tr>
                    <td><?= trans('Re-type password') ?></td><td><input name="re-type-password" equals="password" type="password"/></td>
                </tr>
                <tr>
                    <td><?= trans('Birth') ?></td>
                    <td>
                        <?= trans('Day') ?>:<input name='birth-day' size="2" type="text"/>
                        <?= trans('Month') ?>:
                            <select>
                                <option><?= trans('select') ?></option>
                                <option><?= trans('January') ?></option><option><?= trans('February') ?></option><option><?= trans('March') ?></option>
                                <option><?= trans('April') ?></option><option><?= trans('May') ?></option><option><?= trans('June') ?></option>
                                <option><?= trans('July') ?></option><option><?= trans('August') ?></option><option><?= trans('September') ?></option>
                                <option><?= trans('October') ?></option><option><?= trans('November') ?></option><option><?= trans('December') ?></option>
                            </select>
                    </td>
                </tr>
            </table>
            <input type="submit" value="<?= trans('OK') ?>">
            <button onclick="hide($('reg-dialog'))"><?= trans('Cancel') ?></button>

        </form>

    </div>

<?php if (isset($_SESSION['user-data'])) { ?>
    <div id="profile-dialog" class="dialog" style="display: none">
        <div class="dialog-caption"><?= trans('User information') ?></div>
        <span id="stuff""><?= trans('Information loading...') ?></span>
    </div>
<?php } ?>

</body>

</html>