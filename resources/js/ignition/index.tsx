import React from 'react';
import ReactDOM from 'react-dom';
import ErrorCard from 'resources/js/ignition/components/ErrorCard';
import SolutionCard from 'resources/js/ignition/components/SolutionCard';
import { igniteDataContext } from 'resources/js/ignition/igniteDataContext';
import ErrorUI from 'resources/js/shared/ErrorUI';
import { ErrorOccurrenceWithFrames, IgnitionErrorOccurrence } from 'resources/js/shared/types';

import './symfony/symfony';
import './symfony/symfony.css';

/*
const report: IgniteData = {
    "report": {
        "notifier": "Flare Client",
        "language": "PHP",
        "framework_version": null,
        "language_version": "8.0.1",
        "exception_class": "Exception",
        "seen_at": 1621584918,
        "message": "here",
        "glows": [],
        "solutions": [],
        "stacktrace": [{
            "line_number": 9,
            "method": "require",
            "class": null,
            "code_snippet": {
                "1": "\u003C?php",
                "2": "",
                "3": "use Flare\\Ignition;",
                "4": "",
                "5": "include \u0027vendor\/autoload.php\u0027;",
                "6": "",
                "7": "(new Ignition())-\u003Eregister();",
                "8": "",
                "9": "throw new Exception(\u0027here\u0027);",
                "10": ""
            },
            "file": "\/Users\/freek\/dev\/code\/ignition-app\/index.php",
            "is_application_frame": true
        }, {
            "line_number": 214,
            "method": "[top]",
            "class": null,
            "code_snippet": {
                "185": " *\/",
                "186": "$uri = $valetDriver-\u003EmutateUri($uri);",
                "187": "",
                "188": "\/**",
                "189": " * Determine if the incoming request is for a static file.",
                "190": " *\/",
                "191": "$isPhpFile = pathinfo($uri, PATHINFO_EXTENSION) === \u0027php\u0027;",
                "192": "",
                "193": "if ($uri !== \u0027\/\u0027 \u0026\u0026 ! $isPhpFile \u0026\u0026 $staticFilePath = $valetDriver-\u003EisStaticFile($valetSitePath, $siteName, $uri)) {",
                "194": "    return $valetDriver-\u003EserveStaticFile($staticFilePath, $valetSitePath, $siteName, $uri);",
                "195": "}",
                "196": "",
                "197": "\/**",
                "198": " * Attempt to dispatch to a front controller.",
                "199": " *\/",
                "200": "$frontControllerPath = $valetDriver-\u003EfrontControllerPath(",
                "201": "    $valetSitePath, $siteName, $uri",
                "202": ");",
                "203": "",
                "204": "if (! $frontControllerPath) {",
                "205": "    if (isset($valetConfig[\u0027directory-listing\u0027]) \u0026\u0026 $valetConfig[\u0027directory-listing\u0027] == \u0027on\u0027) {",
                "206": "        show_directory_listing($valetSitePath, $uri);",
                "207": "    }",
                "208": "",
                "209": "    show_valet_404();",
                "210": "}",
                "211": "",
                "212": "chdir(dirname($frontControllerPath));",
                "213": "",
                "214": "require $frontControllerPath;",
                "215": ""
            },
            "file": "\/Users\/freek\/.composer\/vendor\/laravel\/valet\/server.php",
            "is_application_frame": false
        }],
        "context": {
            "request": {
                "url": "http:\/\/ignition-app.test\/",
                "ip": "127.0.0.1",
                "method": "GET",
                "useragent": "Mozilla\/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit\/605.1.15 (KHTML, like Gecko) Version\/14.1 Safari\/605.1.15"
            },
            "request_data": {
                "queryString": [],
                "body": [],
                "files": []
            },
            "headers": {
                "connection": ["keep-alive"],
                "accept-encoding": ["gzip, deflate"],
                "accept-language": ["en-us"],
                "user-agent": ["Mozilla\/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit\/605.1.15 (KHTML, like Gecko) Version\/14.1 Safari\/605.1.15"],
                "accept": ["text\/html,application\/xhtml+xml,application\/xml;q=0.9,*\/*;q=0.8"],
                "upgrade-insecure-requests": ["1"],
                "host": ["ignition-app.test"],
                "content-length": [""],
                "content-type": [""]
            },
            "cookies": [],
            "session": []
        },
        "stage": null,
        "message_level": null,
        "open_frame_index": null,
        "application_path": null,
        "application_version": null
    },
    "config": [],
    "solutions": [],
    "telescopeUrl": null,
    "shareEndpoint": "https:\/\/flareapp.io\/share",
    "defaultTab": "trace",
    "defaultTabProps": []
}
*/

window.ignite = (data) => {
    const errorOccurrence = transformIgnitionError(data.report);

    ReactDOM.render(
        <igniteDataContext.Provider value={data}>
            <div className="layout-col mt-12">
                <ErrorCard errorOccurrence={errorOccurrence} />

                {data.report.solutions.length > 0 && (
                    <div className="layout-col z-1">
                        <SolutionCard flareErrorSolutions={data.report.solutions} />
                    </div>
                )}

                <ErrorUI errorOccurrence={errorOccurrence} />
            </div>
        </igniteDataContext.Provider>,
        document.querySelector('#app'),
    );
};

function transformIgnitionError(ignitionError: IgnitionErrorOccurrence): ErrorOccurrenceWithFrames {
    return {
        frames: ignitionError.stacktrace.map((frame) => ({
            ...frame,
            relative_file: frame.file
                .replace(ignitionError.application_path + '/', '')
                .replace(ignitionError.application_path + '\\', ''),
            class: frame.class || '',
        })),
        context_items: {
            request: [
                { group: 'request', name: 'url', value: ignitionError?.context?.request?.url },
                {
                    group: 'request',
                    name: 'useragent',
                    value: ignitionError.context?.request?.useragent,
                },
                { group: 'request', name: 'ip', value: ignitionError.context?.request?.ip },
                { group: 'request', name: 'method', value: ignitionError.context?.request?.method },
            ],
            request_data: [
                {
                    group: 'request_data',
                    name: 'queryString',
                    value: ignitionError.context.request_data.queryString,
                },
                {
                    group: 'request_data',
                    name: 'body',
                    value: ignitionError.context.request_data.body,
                },
                {
                    group: 'request_data',
                    name: 'files',
                    value: ignitionError.context.request_data.files,
                },
            ],
            queries: ignitionError.context?.queries?.map((query, i) => ({
                group: 'queries',
                name: String(i),
                value: {
                    ...query,
                    replace_bindings: true,
                    bindings: query.bindings.map((binding) => ({
                        type: typeof binding,
                        value: binding,
                    })),
                },
            })),
            dumps: ignitionError.context?.dumps?.map((value, i) => ({
                group: 'dumps',
                name: String(i),
                value,
            })),
            logs: ignitionError.context?.logs?.map((value, i) => ({
                group: 'logs',
                name: String(i),
                value,
            })),
            headers: Object.entries(ignitionError.context.headers || {}).map(([name, [value]]) => ({
                group: 'headers',
                name,
                value,
            })),
            cookies: Object.entries(ignitionError.context.cookies || {}).map(([name, value]) => ({
                group: 'headers',
                name,
                value,
            })),
            session: Object.entries(ignitionError.context.session || {}).map(([name, value]) => ({
                group: 'session',
                name,
                value,
            })),
            env: Object.entries(ignitionError.context.env || {}).map(([name, value]) => ({
                group: 'env',
                name,
                value,
            })),
            user: Object.entries(ignitionError.context.user || {}).map(([name, value]) => ({
                group: 'user',
                name,
                value,
            })),
            route: Object.entries(ignitionError.context.route || {}).map(([name, value]) => ({
                group: 'route',
                name,
                value,
            })),
            git: Object.entries(ignitionError.context.git || {}).map(([name, value]) => ({
                group: 'git',
                name,
                value,
            })),
            view: [] /* @todo ? */,
            context: [] /* @todo ? */,
        },
        id: 0,
        error_id: 0,
        occurrence_number: 0,
        received_at: new Date(ignitionError.seen_at * 1000).toISOString(),
        seen_at_url: ignitionError?.context?.request?.url,
        exception_class: ignitionError.exception_class,
        exception_message: ignitionError.message,
        application_path: ignitionError.application_path,
        application_version: ignitionError.application_version || '',
        language_version: ignitionError.language_version,
        framework_version: ignitionError.framework_version,
        notifier_client_name: 'Flare',
        stage: ignitionError.stage,
        first_frame_class: ignitionError.stacktrace[0].class || '',
        first_frame_method: ignitionError.stacktrace[0].method,
        glows: ignitionError.glows.map((glow) => ({
            ...glow,
            id: 0,
            received_at: '',
        })) /* @todo are these extra properties needed/used? */,
        solutions: [],
        group_identifier: '',
        group_count: 0,
        group_detail_query: '',
        links: { show: '', share: '' } /* @todo catch these being empty in the UI */,
    };
}
