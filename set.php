<?php
$meminstance = new Memcached();
$meminstance->addServer("localhost",23641);
$nick = htmlspecialchars($_GET["nick"]);
if(isset($_GET["color"])){
    $meminstance->set($nick, htmlspecialchars($_GET["color"]));
}
else {
    $keys = $meminstance->getAllKeys();
    $date = htmlspecialchars($_GET["date"]);
    // if(count($keys) > 100){
    //     $meminstance->set($date, date("H:i")."SERVER".": "."reset za 5 sekund!");
    //     $meminstance->flush(5);
    // }
    $message = htmlspecialchars($_GET["message"]);
    $meminstance->set($date, date("H:i").$nick.": ".$message, 30);
}

?>