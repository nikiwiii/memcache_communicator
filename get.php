<?php
$meminstance = new Memcached();
$meminstance->addServer("localhost",23641);
$date = (int)htmlspecialchars($_GET["date"]);
$recs = [];
$time = time();
$found = false;
while(time() - $time < 10){
  if($found == false){
    $keys = $meminstance->getAllKeys();
    foreach($keys as $i){
      // echo $i;
      if (is_numeric($i)) {
        array_push($recs, '"'.$i.'":"'.$meminstance->get($i).'"');
        $found = true;
      }
    }
  }
  else {
    echo "{".implode(",", $recs)."}";
    exit;
  }
  usleep(1000000);
}
echo "";
?>