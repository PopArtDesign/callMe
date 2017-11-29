<?php

$name  = trim($_REQUEST['name']);
$phone = preg_replace('/[^+0-9]/', '', $_REQUEST['phone']);

if (!$name || !$phone) {
    die(json_encode([ 'success' => false, 'message' => 'Please fill out all required fields', 'name' => $phone ]));
}

$domain = function_exists('idn_to_utf8') ? idn_to_utf8($_SERVER['SERVER_NAME']) : $_SERVER['SERVER_NAME'];

$to      = 'user@localhost';
$from    = 'no-reply@'.$domain;
$subject = 'Call me from '. $domain;
$message = "Name: $name, phone: $phone";

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/plain; charset=UTF-8' . "\r\n";
$headers .= "Sender: $from" . "\r\n";
$headers .= "From: $from" . "\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo json_encode([ 'success' => true ]);
} else {
    echo json_encode([ 'success' => false, 'message' => 'An error occurred while sending message. Please try again later!' ]);
}
