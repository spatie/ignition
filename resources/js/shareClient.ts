import { IgniteData, IgnitionErrorOccurrence } from './types';

type ShareResponse = {
    owner_url: string;
    public_url: string;
};

export type SectionName = 'stackTrace' | 'context' | 'debug';

export default function shareError(igniteData: IgniteData, sections: SectionName[]): Promise<ShareResponse> {
    const data = {
        tabs: sectionsToShareTabs(sections),
        lineSelection: window.location.hash,
        report: filterReport(igniteData.shareableReport, sections),
    };

    return new Promise(async (resolve, reject) => {
        try {
            const response = await (
                await fetch(igniteData.config.shareEndpoint, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                })
            ).json();

            if (response && response.owner_url && response.public_url) {
                resolve(response);
            }
        } catch (error) {
            reject(error);
        }

        reject();
    });
}

function sectionsToShareTabs(sections: SectionName[]): string[] {
    let tabs = [];

    if (sections.includes('stackTrace')) {
        tabs.push('stackTraceTab');
    }

    if (sections.includes('context')) {
        tabs.push('requestTab', 'appTab', 'userTab', 'contextTab');
    }

    if (sections.includes('debug')) {
        tabs.push('debugTab');
    }

    return tabs;
}

function filterReport(report: IgnitionErrorOccurrence, sections: SectionName[]): IgnitionErrorOccurrence {
    if (!sections.includes('stackTrace')) {
        report.stacktrace = report.stacktrace.slice(0, 1);
    }

    if (!sections.includes('debug')) {
        report.glows = [];
        report.context.dumps = [];
        report.context.queries = [];
        report.context.logs = [];
    }

    if (!sections.includes('context')) {
        report.context.request_data = { queryString: {}, body: {}, files: [] };
        report.context.headers = {};
        report.context.cookies = {};
        report.context.session = {};
        report.context.route = null;
        report.context.laravel_context = null;
        report.context.user = null;
        delete report.context.git;
        delete report.context.livewire;
        report.context.view = null;
    }

    return report;
}
