import { ErrorSolution } from '@flareapp/ignition-ui';

export type IgniteData = {
    report: IgnitionErrorOccurrence;
    shareableReport: IgnitionErrorOccurrence;
    config: {
        editor: string;
        remoteSitesPath: string;
        localSitesPath: string;
        theme: 'light' | 'dark';
        enableShareButton: boolean;
        directorySeparator: string;
    };
    solutions: Array<any>;
    telescopeUrl: string | null;
    shareEndpoint: string | null;
    defaultTab: string;
    defaultTabProps: Array<any> | {};
    appEnv: string;
    appDebug: boolean;
};

export type IgnitionErrorOccurrence = {
    notifier: string;
    language: string;
    framework_version: string;
    language_version: string;
    exception_class: string;
    seen_at: number;
    message: string;
    glows: Array<{
        time: number;
        name: string;
        message_level: string;
        meta_data: any;
        microtime: number;
    }>;
    solutions: Array<ErrorSolution>;
    stacktrace: Array<{
        line_number: number;
        method: string;
        class: string;
        code_snippet: Record<number, string>;
        file: string;
        application_frame: boolean;
    }>;
    context: {
        request: {
            url: string;
            ip: string | null;
            method: string;
            useragent: string;
        };
        request_data: {
            queryString: Record<string, string>;
            body: Record<string, string>;
            files: Array<any>;
        };
        headers: Record<string, string>;
        cookies: Record<string, string>;
        session: Record<string, string>;
        route: {
            route: string | null;
            routeParameters: Record<string, any>;
            controllerAction: string;
            middleware: Array<string>;
        };
        user: Record<string, any>;
        env: {
            laravel_version: string;
            laravel_locale: string;
            laravel_config_cached: boolean;
            php_version: string;
        };
        logs: Array<{ message: string; level: string; context: any; microtime: number }>;
        dumps: Array<{
            html_dump: string;
            file: string;
            line_number: number;
            microtime: number;
        }>;
        queries: Array<{
            sql: string;
            time: number;
            connection_name: string;
            bindings: Array<any>;
            microtime: number;
        }>;
        git: {
            hash: string;
            message: string;
            tag: string;
            remote: string;
            isDirty: boolean;
        };
    };
    stage: string;
    message_level: null | string;
    open_frame_index: null | number;
    application_path: string;
    application_version: null | string;
};
