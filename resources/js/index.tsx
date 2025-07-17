import {ErrorOccurrence} from 'types'
import React from 'react';
import ReactDOM from 'react-dom';
import {IgniteData} from 'types';
import './vendor/symfony';
import '../css/app.css';
import Ignition from 'Ignition';

window.ignite = (data) => {
    const errorOccurrence = transformIgnitionError(data);

    console.log(data, errorOccurrence);

    ReactDOM.render(<Ignition errorOccurrence={errorOccurrence} igniteData={data}/>, document.querySelector('#app'));
};

function transformIgnitionError({report, solutions}: IgniteData): ErrorOccurrence {
    return {
        frames: report.stacktrace.map((frame) => ({
            ...frame,
            relative_file: frame.file
                .replace(report.applicationPath + '/', '')
                .replace(report.applicationPath + '\\', ''),
            class: frame.class || '',
            line_number: frame.lineNumber,
            application_frame: frame.isApplicationFrame,
            code_snippet: frame.codeSnippet
        })),
        context_items: {
            request: {
                url: report.attributes['url.full'],
                ip: report.attributes['client.address'] || null,
                method: report.attributes['http.request.method'] || null,
                useragent: report.attributes['user_agent.original'] || null,
                referrer: report.attributes['http.request.referrer'] || null,
                readyState: report.attributes['document.ready_state'] || null,
            },
            request_data: {
                queryString: {},
                body: {},
                files: []
            },
            queries:  null,
            dumps:  null,
            logs:  null,
            laravel_context:  null,
            headers:  null,
            cookies:  null,
            session:  null,
            env:  null,
            user:  null,
            route:  null,
            git:  null,
            livewire:  null,
            view:  null,
            exception:  null,
            arguments:  null,
            job:  null,
        },
        custom_context_items: [],
        type: 'web',
        entry_point: report.attributes['url.full'],
        exception_class: report.exceptionClass,
        exception_message: report.message || '',
        application_path: report.applicationPath,
        application_version: report.attributes['service.version'] || null,
        language_version: report.attributes['flare.language.version'] || null,
        framework_version: report.attributes['flare.framework.version'] || null,
        notifier_client_name: 'Flare',
        stage: report.attributes['service.stage'],
        first_frame_class: report.stacktrace[0].class || '',
        first_frame_method: report.stacktrace[0].method,
        glows: [],
        solutions,
        documentation_links: [],
    };
}
