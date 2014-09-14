<?php

/*
 * Login function
 */
include './services/dao.php';

session_start();

$username = $_POST["username"];
$password = $_POST["pwd"];

$user = getUserByUsernameAndPassword($username, $password);

if ($user == null) {
    header('Location: index.php?login-form');
    return;
}

$_SESSION['user'] = $user;
header('Location: index.php');