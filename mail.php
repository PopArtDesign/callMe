<?php

namespace PopArtDesign\CallMe;

require 'helpers.php';

if ('imnotarobot!' !== $_REQUEST['_secret']) {
    fail('Secret value is invalid!');
}

$name  = \trim($_REQUEST['name']);
$phone = \preg_replace('/[^+0-9]/', '', $_REQUEST['phone']);

if (!$name || !$phone) {
    fail('Please fill out all required fields');
}

$domain = detectDomain();

$to      = 'user@localhost';
$from    = 'no-reply@' . $domain;
$subject = 'Call me from '. $domain;
$message = "Name: $name, phone: $phone";

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/plain; charset=UTF-8';
$headers[] = 'Sender: ' . $from;
$headers[] = 'From: ' . $from;

if (sendMail($to, $subject, $message, [ 'headers' => $headers ])) {
    success();
} else {
    fail('An error occurred while sending message. Please try again later!');
}
