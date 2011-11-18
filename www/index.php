<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Welcome</title>
	
	<link rel="stylesheet" type="text/css" href="css/default.css" />
	
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
    
</head>

<body onload="refreshPositions();">
	
	<div class="user-panel" id="user-panel">
		<a onclick="enter()" href="#">Enter</a>|
		<a onclick="reg()" href="#">Register</a>
	</div>
	
	<div id="enter-dialog" class="dialog" style="visibility: hidden">
		<div class="dialog-caption">Please enter your email and password</div>
		<form>
		
			<table>
				<tr>
					<td>Email</td><td><input email type="text"/></td>
				</tr>
				<tr>
					<td>Password</td><td><input type="password"/></td>
				</tr>
			</table>
			<input type="submit" value="OK">
			<button onclick="hide('enter-dialog')">Cancel</button>
		
		</form>
		
	</div>
	
	<div id="reg-dialog" class="dialog" style="visibility: hidden">
		<div class="dialog-caption">Please enter your information</div>
		<form id="reg-form" onsubmit="checkRegFields();return false;" method="POST">
		
			<table>
				<tr>
					<td>Name</td><td><input name="name" type="text"/></td>
				</tr>
				<tr>
					<td>Email</td><td><input name="email" type="text"/></td>
				</tr>
				<tr>
					<td>Password</td><td><input type="password"/></td>
				</tr>
				<tr>
					<td>Re-type password</td><td><input type="password"/></td>
				</tr>
			</table>
			<input type="submit" value="OK">
			<button onclick="hide('reg-dialog')">Cancel</button>
		
		</form>
		
	</div>
	
</body>

</html>