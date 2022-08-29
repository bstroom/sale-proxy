<?php

if (! function_exists('ddh')) {
    /**
     * Dump the passed variables and end the script.
     *
     * @param  mixed  $args
     * @return void
     */
    function ddh(...$args)
    {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
        header("Access-Control-Allow-Origin: $origin");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: "*"');
        header('Access-Control-Allow-Headers: "*"');
        http_response_code(500);

        foreach ($args as $x) {
            (new \Illuminate\Support\Debug\Dumper)->dump($x);
        }

        die(1);
    }
}
