import { ErrorOccurrence } from '@flareapp/ignition-ui';
import React from 'react';
import ReactDOM from 'react-dom';
import { IgniteData } from './types';
import './vendor/symfony';
import '../css/app.css';
import Ignition from 'Ignition';

window.ignite = (data) => {
    const errorOccurrence = transformIgnitionError(data);

    console.log(data, errorOccurrence);

    ReactDOM.render(<Ignition errorOccurrence={errorOccurrence} igniteData={data} />, document.querySelector('#app'));
};

function transformIgnitionError({ report, solutions }: IgniteData): ErrorOccurrence {
    return {
        frames: report.stacktrace.map((frame) => ({
            ...frame,
            relative_file: frame.file
                .replace(report.application_path + '/', '')
                .replace(report.application_path + '\\', ''),
            class: frame.class || '',
        })),
        context_items: {
            request: report.context?.request,
            request_data: report.context?.request_data,
            queries: report.context?.queries || null,
            dumps: report.context?.dumps || null,
            logs: report.context.logs || null,
            headers: report.context?.headers || null,
            cookies: report.context?.cookies || null,
            session: report.context?.session || null,
            env: report.context?.env || null,
            user: report.context?.user || null,
            route: report.context?.route || null,
            git: report.context?.git || null,
            livewire: report.context.livewire || null,
            view: report.context.view || null,
        },
        type: 'web',
        entry_point: report?.context?.request?.url,
        exception_class: report.exception_class,
        exception_message: report.message || '',
        application_path: report.application_path,
        application_version: report.application_version,
        language_version: report.language_version,
        framework_version: report.framework_version,
        notifier_client_name: 'Flare',
        stage: report.stage,
        first_frame_class: report.stacktrace[0].class || '',
        first_frame_method: report.stacktrace[0].method,
        glows: report.glows,
        solutions,
        documentation_links: report.documentation_links,
    };
}
