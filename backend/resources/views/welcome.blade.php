<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <link rel="icon" href="{{asset('/favicon.ico')}}" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Web site created using create-react-app" />
    <link rel="apple-touch-icon" href="{{asset('build/logo192.png')}}" />
    <link rel="manifest" href="{{asset('build/manifest.json')}}" />
    <title>1Proxy.net | Proxy VN & Quốc tế</title>
    <script>
        window.baseUrl = "{{ env('SERVER_API') }}"
    </script>
    <link href="{{asset('build/static/css/main.css?v='.env('RESOURCE_VER'))}}" rel="stylesheet">
    <script defer="defer" src="{{asset('build/static/js/main.js?v=').env('RESOURCE_VER')}}"></script>
</head>
<body><noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
</body>
</html>
