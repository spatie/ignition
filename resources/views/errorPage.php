<!doctype html>
<html class="theme-<?= $theme ?>">
<!--
<?=$throwableString?>
-->
<head>
    <!-- Hide dumps asap -->
    <style>
        pre.sf-dump {
            display: none !important;
        }
    </style>

    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="robots" content="noindex, nofollow">

    <title><?= $title ?></title>

</head>
<body class="scrollbar-lg">

<script>
    window.data = <?=
        $jsonEncode([
            'report' => $report,
            'shareableReport' => $shareableReport,
            'config' => $config,
            'solutions' => $solutions,
            'updateConfigEndpoint' => $updateConfigEndpoint,
            'defaultTab' => $defaultTab,
            'defaultTabProps' => $defaultTabProps,
        ])
        ?>;
</script>

<!-- The noscript representation is for HTTP client like Postman that have JS disabled. -->
<noscript><pre><?=$throwableString?></pre></noscript>

<div id="app"></div>

<style><?= $getAssetContents('ignition.css') ?></style>

<!--
    Use HTML comments inside script tag to prevent parsing of </script> inside FontAwesome comments
    See: https://github.com/FortAwesome/Font-Awesome/issues/18473
-->
<script>
<!--
<?= $getAssetContents('ignition.js') ?>
//-->
</script>
<script>
    window.ignite(window.data);
</script>
<!--
<?=$throwableString?>
-->
</body>
</html>
