
<!doctype html>
<html lang="pt-br">
	<head>
		<title>Paymentss</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta name="theme-color" content="#333333">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta name="csrf-token" content="{{ csrf_token() }}">
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" crossorigin="anonymous">
		<link type="text/css" href="https://fonts.googleapis.com/css?family=Muli:400,300" rel="stylesheet">
		<link type="text/css" href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
	</head>
	<body>
		<div id="app">
			<app></app>
		</div>
	
		<script src="{{ mix('/js/vendor.js') }}"></script>
		<script src="{{ mix('/js/manifest.js') }}"></script>
		<script src="{{ mix('/js/app.js') }}"></script>
	</body>
</html>