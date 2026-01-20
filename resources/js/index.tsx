import { ErrorOccurrence } from 'ignition-ui';
import ReactDOM from 'react-dom';
import { IgniteData } from 'types';
import './vendor/symfony';
import '../css/app.css';
import Ignition from './Ignition';

window.ignite = (data) => {
    const errorOccurrence = transformIgnitionError(data);

    ReactDOM.render(<Ignition errorOccurrence={errorOccurrence} igniteData={data} />, document.querySelector('#app'));
};

function transformIgnitionError({ report, solutions }: IgniteData): ErrorOccurrence {
    return {
        type: 'web',
        entry_point: 'todo',
        exception_message: report.message,
        exception_class: report.exceptionClass,
        application_path: report.applicationPath,
        application_version: report.attributes['service.version'] ?? null,
        notifier_client_name: report.attributes['telemetry.sdk.name'] ?? 'Ignition',
        language_version: report.attributes['flare.language.version'] ?? null,
        framework_version: report.attributes['flare.framework.version'] ?? null,
        stage: report.attributes['service.version'] ?? null,
        attributes: report.attributes,
        events: report.events,
        first_frame_class: report.stacktrace[0].class || '',
        first_frame_method: report.stacktrace[0].method || '',
        solutions: solutions,
        documentation_links: [],
        frames: report.stacktrace.map(frame => ({
            class: frame.class || '',
            method: frame.method,
            file: frame.file,
            relative_file: frame.file, // TODO
            line_number: frame.lineNumber,
            application_frame: frame.isApplicationFrame,
            arguments: frame.arguments || [],
            code_snippet: frame.codeSnippet,
        })),
        language: 'PHP',
    };
}
