<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>communicate</title>
    <link rel="stylesheet" href="style.css">
    <link href="stylesheets/jquery.cssemoticons.css" media="screen" rel="stylesheet" type="text/css" />
    <script src="javascripts/jquery-1.4.2.min.js" type="text/javascript"></script>
    <script src="javascripts/jquery.cssemoticons.js" type="text/javascript"></script>
    <script src="script.js"></script>
</head>
<body>
    <br>
    <h1>IR<span class="title">Chat</span></h1>
    <p id="nick" style="text-align: center;">Piszesz jako: </p>
    <br>
    <div class="chat">
        <div class="messages"></div>
        <div class="controls">
            <input type="text" name="message" id="message" placeholder="pisz wiadomość">
            <button onclick="send()">Wyślij</button>
        </div>
    </div>
</body>
</html>