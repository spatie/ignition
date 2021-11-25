import { ErrorOccurrence, Stacktrace, Context, Debug, ErrorOccurrenceContext, ErrorCard } from '@flareapp/ignition-ui';
import React from 'react';
import ReactDOM from 'react-dom';
import { igniteDataContext } from 'resources/js/igniteDataContext';
import { IgniteData } from './types';
import './symfony/symfony';
import '../css/app.css';
import NavBar from 'components/NavBar';
import Section from 'components/Section';
import InViewContextProvider from 'contexts/InViewContextProvider';

window.ignite = (data) => {
    const errorOccurrence = transformIgnitionError(data);

    window.shareableReport = data.shareableReport;

    console.log(data, errorOccurrence);

    ReactDOM.render(
        <igniteDataContext.Provider value={data}>
            <ErrorOccurrenceContext.Provider value={errorOccurrence}>
                <InViewContextProvider>
                    <NavBar />

                    <main
                        id="top"
                        className="mx-auto mb-20 px-6 lg:px-10 2xl:px-20 max-w-4xl lg:max-w-[90rem] 2xl:max-w-none grid grid-cols-1 2xl:grid-cols-2 2xl:gap-x-20"
                    >
                        <ErrorCard />

                        <Section name="stack">
                            <Stacktrace />
                        </Section>

                        <Section name="context">
                            <Context />
                        </Section>

                        <Section name="debug">
                            <Debug />
                        </Section>
                    </main>
                </InViewContextProvider>
            </ErrorOccurrenceContext.Provider>
        </igniteDataContext.Provider>,
        document.querySelector('#app'),
    );
};

function transformIgnitionError({ report, shareEndpoint, solutions }: IgniteData): ErrorOccurrence {
    return {
        frames: report.stacktrace.map((frame) => ({
            ...frame,
            relative_file: frame.file
                .replace(report.application_path + '/', '')
                .replace(report.application_path + '\\', ''),
            class: frame.class || '',
        })),
        context_items: {
            request: [
                { group: 'request', name: 'url', value: report?.context?.request?.url },
                {
                    group: 'request',
                    name: 'useragent',
                    value: report.context?.request?.useragent,
                },
                { group: 'request', name: 'ip', value: report.context?.request?.ip },
                { group: 'request', name: 'method', value: report.context?.request?.method },
            ],
            request_data: [
                {
                    group: 'request_data',
                    name: 'queryString',
                    value: report.context.request_data.queryString,
                },
                {
                    group: 'request_data',
                    name: 'body',
                    value: report.context.request_data.body,
                },
                {
                    group: 'request_data',
                    name: 'files',
                    value: report.context.request_data.files,
                },
            ],
            queries: report.context?.queries?.map((query, i) => ({
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
            dumps: report.context?.dumps?.map((value, i) => ({
                group: 'dumps',
                name: String(i),
                value,
            })),
            logs: report.context?.logs?.map((value, i) => ({
                group: 'logs',
                name: String(i),
                value,
            })),
            headers: Object.entries(report.context.headers || {}).map(([name, [value]]) => ({
                group: 'headers',
                name,
                value,
            })),
            cookies: Object.entries(report.context.cookies || {}).map(([name, value]) => ({
                group: 'headers',
                name,
                value,
            })),
            session: Object.entries(report.context.session || {}).map(([name, value]) => ({
                group: 'session',
                name,
                value,
            })),
            env: Object.entries(report.context.env || {}).map(([name, value]) => ({
                group: 'env',
                name,
                value,
            })),
            user: Object.entries(report.context.user || {}).map(([name, value]) => ({
                group: 'user',
                name,
                value,
            })),
            route: Object.entries(report.context.route || {}).map(([name, value]) => ({
                group: 'route',
                name,
                value,
            })),
            git: Object.entries(report.context.git || {}).map(([name, value]) => ({
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
        received_at: new Date(report.seen_at * 1000).toISOString(),
        seen_at_url: report?.context?.request?.url,
        exception_class: report.exception_class,
        exception_message: report.message,
        application_path: report.application_path,
        application_version: report.application_version || '',
        language_version: report.language_version,
        framework_version: report.framework_version,
        notifier_client_name: 'Flare',
        stage: report.stage,
        first_frame_class: report.stacktrace[0].class || '',
        first_frame_method: report.stacktrace[0].method,
        glows: report.glows.map((glow) => ({
            ...glow,
            id: 0,
            received_at: '',
        })),
        solutions,
        /* @todo are these extra properties needed/used? */
        group_identifier: '',
        group_count: 0,
        group_detail_query: '',
        links: { show: '', share: shareEndpoint || '' },
    };
}
