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


// The data the PHP Ignition package passes to the client. Needs to be transformed to ErrorOccurrence to be rendered in Ignition.
export type IgnitionErrorOccurrence = {
    exceptionClass: string;
    seenAtUnixNano: number;
    message: string;
    solutions: Array<ErrorSolution>;
    stacktrace: Array<{
        lineNumber: number;
        method: string;
        class: string|null;
        codeSnippet: Record<number, string>;
        file: string;
        isApplicationFrame: boolean;
        arguments: Array<ErrorFrameArgument>|null;
    }>;
    openFrameIndex: null | number;
    applicationPath: string;
    trackingUuid: string;
    handled: boolean | null;
    attributes: Record<string, any>
    events: Array<{
        type: string;
        startTimeUnixNano: number;
        endTimeUnixNano: number | null;
        attributes: Record<string, any>;
    }>
    level?: string;
};

export type EditorOption = {
    label: string;
    url: string;
    clipboard?: boolean;
};

export type IgnitionConfig = {
    editor?: string | null;
    editorOptions?: {
        [editor: string]: EditorOption;
    } | null;
    remoteSitesPath: string;
    localSitesPath: string;
    theme: 'light' | 'dark' | 'auto';
    enableShareButton: boolean;
    directorySeparator: string;
    shareEndpoint: string;
};

export type ErrorFrameArgument = {
    name: string,
    value: string | number | boolean | object | Array<any> | null,
    passed_by_reference: boolean,
    is_variadic: boolean,
    truncated: boolean,
    original_type: string,
}

export type ErrorFrame = {
    class?: string | null;
    method: string;
    code_snippet: {
        [lineNumber: string]: string
    };
    file: string;
    relative_file: string;
    line_number: number;
    application_frame: boolean;
    arguments: Array<ErrorFrameArgument> | null;
};

// The ErrorOccurrence Ignition UI needs to render.
export type ErrorOccurrence = {
    type: 'web' | 'cli' | 'queue' | null;
    entry_point: string;
    exception_message: string;
    exception_class: string;
    application_path: string;
    application_version: string | null;
    notifier_client_name: string;
    language_version?: string;
    framework_version?: string;
    stage: string;
    context_items: {
        env: null | EnvContext;
        dumps: null | DumpContext;
        request: null | RequestContext;
        request_data: null | RequestDataContext;
        laravel_context: null | LaravelContext;
        logs: null | LogContext;
        queries: null | QueryContext;
        livewire: null | Array<LivewireContext>;
        view: null | ViewContext;
        headers: null | HeadersContext;
        session: null | SessionContext;
        cookies: null | CookiesContext;
        user: null | UserContext;
        route: null | RouteContext;
        git: null | GitContext;
        exception: null | ExceptionContext;
        arguments: null | ArgumentsContext;
        job: null | JobContext;
    };
    custom_context_items: Array<{
        name: string;
        items: Record<string, any>;
    }>
    first_frame_class: string;
    first_frame_method: string;
    glows: Array<ErrorGlow>;
    solutions: Array<ErrorSolution>;
    documentation_links: Array<string>;
    frames: Array<ErrorFrame>;
};

export type HeadersContext = Record<string, string | number>;
export type SessionContext = Record<string, string | number>;
export type CookiesContext = Record<string, string | object | boolean | number>;

export type RequestContext = {
    // PHP context
    url: string;
    ip?: string | null;
    method?: string | null;
    useragent?: string | null;

    // JS context
    referrer?: string | null;
    readyState?: string | null;
};

export type RequestDataContext = {
    queryString: Record<string, string>;
    body: null | string | Record<string, string>;
    files: null | string | Array<any>; // TODO: figure out what this is
};

export type LaravelContext = Record<string, any>;

export type EnvContext = {
    laravel_version?: string;
    laravel_locale?: string;
    laravel_config_cached?: boolean;
    app_debug?: boolean;
    app_env?: string;
    php_version?: string;
    [key: string]: any;
};

export type UserContext = {
    [key: string]: string | null;
};

export type ArgumentsContext = Array<string>;

export type ExceptionContext = Record<string, any>;

export type JobContext = Record<string, any>;

export type GitContext = {
    hash: string;
    message: string;
    tag: string | null;
    remote: string | null;
    isDirty: boolean;
};

export type RouteContext = {
    route: string | null;
    routeParameters: null | Record<string, number | string | null>;
    controllerAction: string | null;
    middleware: Array<string>;
};

export type ViewContext = {
    view: string;
    data: Record<string, string>;
};

export type LivewireContext = {
    component_alias?: string;
    component_class?: string;
    component_id: string;
    data: Record<string, string | object>;
    memo?: Record<string, string | object>;
    updates: Array<{
        payload: Record<string, any>;
        type: string;
    }>;
    calls?: Array<{
        path: string,
        method: string,
        params: Record<string, any>;
    }>
};

export type QueryContext = Array<QueryDebug> | {
    [key: string]: QueryDebug
};

export type DumpContext = Array<DumpDebug> | {
    [key: string]: DumpDebug
};

export type LogContext = Array<LogDebug> | {
    [key: string]: LogDebug
};

export type ErrorGlow = {
    message_level: LogLevel;
    meta_data: Record<string, string | object>;
    microtime: number;
    name: string;
};

export type ErrorSolution = {
    class: string;
    title: string;
    description: string;
    links: {
        [label: string]: string
    };
    aiGenerated: boolean;
};

export type FrameType = 'application' | 'vendor' | 'unknown';

export type StackFrameGroupType = {
    type: FrameType;
    relative_file: string;
    expanded: boolean;
    frames: Array<ErrorFrame & {
        frame_number: number;
        selected: boolean
    }>;
};

export type Tabname = 'stackTraceTab' | 'requestTab' | 'appTab' | 'userTab' | 'contextTab' | 'debugTab';

export type SharePostData = {
    tabs?: Array<Tabname>;
    selectedTabNames: Array<Tabname>;
    lineSelection: string;
};

export type QueryDebug = {
    bindings: Array<string> | null;
    microtime: number;
    sql: string;
    time: number;
    connection_name: string;
};

export type QueryDebugWithBindings = QueryDebug & {
    bindings: Array<string>;
};

export type DumpDebug = {
    html_dump: string;
    file: string;
    line_number: number;
    microtime: number;
};

export type LogLevel = 'debug' | 'info' | 'notice' | 'warning' | 'error' | 'critical' | 'alert' | 'emergency' | 'warn';

export type LogDebug = {
    context: Record<string, string | object>;
    level: LogLevel;
    message: string;
    microtime: number;
};
