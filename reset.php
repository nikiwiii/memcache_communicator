<?php
$meminstance = new Memcached();
$meminstance->addServer("localhost",23641);
$keys = $meminstance->flush();
echo "zresetowano memcache";
?>