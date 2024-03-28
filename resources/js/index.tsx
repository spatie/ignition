import {ErrorOccurrence} from '@flareapp/ignition-ui';
import React from 'react';
import ReactDOM from 'react-dom';
import {IgniteData} from './types';
import './vendor/symfony';
import '../css/app.css';
import Ignition from 'Ignition';

window.ignite = (data) => {
    const errorOccurrence = transformIgnitionError(data);

    console.log(data, errorOccurrence);

    ReactDOM.render(<Ignition errorOccurrence={errorOccurrence} igniteData={data}/>, document.querySelector('#app'));
};

function transformIgnitionError({report, solutions}: IgniteData): ErrorOccurrence {
    const {
        request,
        request_data,
        queries,
        dumps,
        logs,
        headers,
        cookies,
        session,
        env,
        user,
        route,
        git,
        livewire,
        view,
        exception,
        arguments: args,
        job,
        laravel_context,
        ...custom_context
    } = report.context;

    const customContext = Object.entries<any>(custom_context)
        .map(([name, items]) => {
            return {
                name: name,
                items: items,
            };
        });

    return {
        frames: report.stacktrace.map((frame) => ({
            ...frame,
            relative_file: frame.file
                .replace(report.application_path + '/', '')
                .replace(report.application_path + '\\', ''),
            class: frame.class || '',
        })),
        context_items: {
            request: request,
            request_data: request_data,
            queries: queries || null,
            dumps: dumps || null,
            logs: logs || null,
            laravel_context: laravel_context || null,
            headers: headers || null,
            cookies: cookies || null,
            session: session || null,
            env: env || null,
            user: user || null,
            route: route || null,
            git: git || null,
            livewire: livewire || null,
            view: view || null,
            exception: exception || null,
            arguments: args || null,
            job: job || null,
        },
        custom_context_items: customContext,
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
