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

$attachments = uploadedFilesToAttachments(['files']);
// $attachments = [
//     [ 'path' => __DIR__ . '/mail.php', 'name' => 'mail.php', 'type' => 'text/plain' ]
// ];

$domain = detectDomain();

$to      = 'user@localhost';
$from    = 'no-reply@' . $domain;
$subject = 'Call me from '. $domain;
$message = "Name: $name, phone: $phone";
$options = [
    'sender' => $from,
    'from'   => $from,
    'attachments' => $attachments
];

if (sendMail($to, $subject, $message, $options)) {
    success();
} else {
    fail('An error occurred while sending message. Please try again later!');
}
