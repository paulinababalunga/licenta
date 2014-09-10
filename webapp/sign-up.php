<?php

/*
 * SignUp function, insert into database and validate data
 */


$username = $_POST['username'];
$email = $_POST['email'];
$pwd1 = $_POST['pwd1'];
$pwd2 = $_POST['pwd2'];

if ($_POST["pwd1"] == $_POST["pwd2"] && $_POST["pwd1"] != "" && $_POST["username"] != "" && $_POST["email"] != "") {
    $connection = pg_connect("host=localhost port=5432 dbname=licenta user = postgres password = paulina ")
    or die("Connection failed --> " . pg_last_error($connection));

    $query = "SELECT username FROM public.users WHERE username='$username'";
    $result = pg_query($query) or die('Query failed: ' . pg_last_error());

    if (!pg_fetch_array($result, null, PGSQL_ASSOC)) {
        $sql = ("insert into public.users(username,email,pwd) values('" . $username . "','" . $email . "','" . $pwd1 . "')");
        if (!pg_query($sql)) {
            die('Error :' . pg_last_error());
        }
        echo "You are registered. Congrats !!!";
        echo "<a href='index.php'> Go back to login page </a>";
    } else {
        echo "Username Already exists ! ";
    }
    pg_close($connection);
} else {
    if ($pwd1 != $pwd2) {
        echo "Password mismatch <br />";
    } else {
        echo "Invalid Username  <br />";
    }
}