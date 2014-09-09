<?php
include './dao.php';

$term = $_GET["term"];

$sql = "SELECT * from vw_cautare where tip = '" . $term . "' or upper(nume) like upper('%" . $term . "%')";

$list = runQuery($sql);

echo json_encode($list);
