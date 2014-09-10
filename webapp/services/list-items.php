<?php

include './dao.php';
include './../layers.php';

$table = $_GET["table"];

$sql = "SELECT * FROM " . $table;

$list = runQuery($sql);

echo json_encode($list);

