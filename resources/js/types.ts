import { AttributesData, EditorOptions, ErrorOccurrenceEvent, IgnitionConfig } from 'ignition-ui';

export type IgniteData = {
    report: IgnitionErrorOccurrence;
    shareableReport: IgnitionErrorOccurrence;
    solutions: Array<any>;
    documentationLinks: Array<string>;
    editorOptions: EditorOptions;
    updateConfigEndpoint: string | null;
    shareEndpoint: string;
    config: IgnitionConfig;
};
export type IgnitionErrorOccurrence = {
    applicationPath: string | null;
    attributes: AttributesData;
    events: Array<ErrorOccurrenceEvent>,
    exceptionClass: string;
    handled: boolean | null;
    isLog: boolean;
    message: string;
    openFrameIndex: number | null;
    overriddenGrouping: null | string;
    seenAtUnixNano: number;
    solutions: Array<any>;
    stacktrace: Array<{
        class: string | null;
        arguments: Array<any>;
        codeSnippet: Record<number, string>;
        file: string;
        lineNumber: number;
        isApplicationFrame: boolean;
        method: string;
    }>;
};
