<?php

namespace PopArtDesign\CallMe;

function success()
{
    die(\json_encode([ 'success' => true ]));
}

function fail($message = 'An error occurred while sending message. Please try again later!')
{
    die(\json_encode([ 'success' => false, 'message' => $message ]));
}

function detectDomain()
{
    return \function_exists('idn_to_utf8') ? idn_to_utf8($_SERVER['SERVER_NAME']) : $_SERVER['SERVER_NAME'];
}

function sendMail($to, $subject, $message, $options = [])
{
    $headers = $options['headers'] ?? [];

    return \mail($to, $subject, $message, implode("\r\n", $headers));
}
