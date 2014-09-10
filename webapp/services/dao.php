<?php

$conn_string = "host=localhost port=5432 dbname=licenta user = postgres password = paulina ";


class User
{
    var $username;
}

/**
 * Ruleaza selectul transmis ca parametru.
 *
 * @global string $conn_string
 * @param type $query
 * @return type
 */
function runQuery($query)
{
    global $conn_string;
    $connection = pg_connect($conn_string) or die("Connection failed --> " . pg_last_error($connection));
    $result = pg_query($connection, $query) or die('Query failed: ' . pg_last_error());
    $data = pg_fetch_all($result);
    pg_close($connection);
    return $data;
}

/**
 * Intoarce utilizatorul din baza de date dupa user si parola sau null daca nu exista
 *
 * @param type $username
 * @param type $password
 */
function getUserByUsernameAndPassword($username, $password)
{
    $data = runQuery("SELECT username, pwd FROM public.users WHERE username = '$username' AND pwd = '$password'");
//    $user = null;
//    if( $data != null){
//        $user = new User();
//        $user->username = $data[0]["username"];
//    }
    return $data[0];
}
