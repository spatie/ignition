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

    <!--  TODO: Get rid of this, this is temporary  -->
    <link
        rel='stylesheet'
        href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'
        integrity='sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=='
        crossorigin='anonymous'
        referrerpolicy='no-referrer'
    />

</head>
<body class="scrollbar-lg">

<script>
    window.data = <?=
        $jsonEncode([
            'report' => $report,
            'shareableReport' => $shareableReport,
            'config' => $config,
            'solutions' => $solutions,
            'shareEndpoint' => $shareEndpoint,
            'defaultTab' => $defaultTab,
            'defaultTabProps' => $defaultTabProps,
        ])
        ?>;
</script>

<noscript><pre><?=$throwableString?></pre></noscript>

<div id="app"></div>

<style><?= $getAssetContents('ignition.css') ?></style>
<script><?= $getAssetContents('ignition.js') ?></script>
<script>
    window.ignite(window.data);
</script>
<!--
<?=$throwableString?>
-->
</body>
</html>
