import { ErrorSolution, IgnitionConfig, ViewContext, LogLevel } from '@flareapp/ignition-ui';

export type IgniteData = {
    report: IgnitionErrorOccurrence;
    shareableReport: IgnitionErrorOccurrence;
    config: IgnitionConfig;
    solutions: Array<any>;
    shareEndpoint: string | null;
    updateConfigEndpoint: string | null;
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
        message_level: LogLevel;
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
        cookies: Record<string, string | object | boolean>;
        session: Record<string, string>;
        route?: {
            route: string | null;
            routeParameters: Record<string, number | string | null>;
            controllerAction: string | null;
            middleware: Array<string>;
        } | null;
        user?: Record<string, any> | null;
        env: {
            laravel_version: string;
            laravel_locale: string;
            laravel_config_cached: boolean;
            app_debug: boolean;
            app_env: string;
            php_version: string;
        };
        logs?: Array<{ message: string; level: LogLevel; context: any; microtime: number }>;
        dumps?: Array<{
            html_dump: string;
            file: string;
            line_number: number;
            microtime: number;
        }>;
        queries?: Array<{
            sql: string;
            time: number;
            connection_name: string;
            bindings: Array<any>;
            microtime: number;
        }>;
        git?: {
            hash: string;
            message: string;
            tag: string;
            remote: string;
            isDirty: boolean;
        };
        livewire?: {
            component_alias: string;
            component_class: string;
            component_id: string;
            data: Record<string, any>;
            updates: Array<{
                payload: Record<string, any>;
                type: string;
            }>;
        };
        view: ViewContext | null;
    };
    stage: string;
    message_level: null | string;
    open_frame_index: null | number;
    application_path: string;
    application_version: null | string;
    documentation_links: Array<string>;
};
