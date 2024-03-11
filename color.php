<?php
$meminstance = new Memcached();
$meminstance->addServer("localhost",23641);
$nick = htmlspecialchars($_GET["nick"]);
$color = $meminstance->get($nick);
echo $color;
?>