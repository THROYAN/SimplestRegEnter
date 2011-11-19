<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Welcome</title>
	
	<link rel="stylesheet" type="text/css" href="css/default.css" />
	
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/validators.js"></script>
	<script type="text/javascript" src="js/ajax.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
    
</head>

<body onload="refreshPositions(); setValidators();">
	
	<div class="user-panel" id="user-panel">
		<a onclick="enter()" href="#">Enter</a>|
		<a onclick="reg()" href="#">Register</a>
	</div>
	
	<div id="enter-dialog" class="dialog" style="display: none">
		<div class="dialog-caption">Please enter your email and password</div>
		<form>
		
			<table>
				<tr>
					<td>Email</td><td><input type="text"/></td>
				</tr>
				<tr>
					<td>Password</td><td><input type="password"/></td>
				</tr>
			</table>
			<input type="submit" value="OK">
			<button onclick="hide($('enter-dialog'))">Cancel</button>
		
		</form>
		
	</div>
	
	<div id="reg-dialog" class="dialog" style="display: none">
		<div class="dialog-caption">Please enter your information</div>
		<!-- Устанавливаем для формы аттрибут novalidate чтобы отключить HTML5 валидацию -->
		<form id="reg-form" action="#" onsubmit="checkRegFields();return false;" method="POST" novalidate>
		
			<table>
				<tr>
					<td>Name</td><td><input required name="name" type="text" maxLength="26"/></td>
				</tr>
				<tr>
					<td>Email</td><td><input required name="email" type="text"/></td>
				</tr>
				<tr>
					<td>Password</td><td><input required name="password" minLength="6" type="password"/></td>
				</tr>
				<tr>
					<td>Re-type password</td><td><input name="re-type-password" equals="password" type="password"/></td>
				</tr>
			</table>
			<input type="submit" value="OK">
			<button onclick="hide($('reg-dialog'))">Cancel</button>
		
		</form>
		
	</div>
	
</body>

</html>