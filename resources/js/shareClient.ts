import { IgniteData, IgnitionErrorOccurrence } from 'types';

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
        report.events = [];
    }

    if (!sections.includes('context')) {
        const attributes = report.attributes as Record<string, any>;

        delete attributes['client.address'];
        delete attributes['user_agent.original'];
        delete attributes['user.id'];
        delete attributes['user.full_name'];
        delete attributes['user.email'];
        delete attributes['user.attributes'];

        Object.keys(attributes).forEach(key => {
            if (key.startsWith('http.') || key.startsWith('url.')) {
                delete attributes[key];
            }
        });

        Object.keys(attributes).forEach(key => {
            if (key.startsWith('laravel.') || key.startsWith('view.') || key.startsWith('service.')) {
                delete attributes[key];
            }
        });

        Object.keys(attributes).forEach(key => {
            if (
                key.startsWith('git.') ||
                key.startsWith('host.') ||
                key.startsWith('network.') ||
                key.startsWith('context.') ||
                key.startsWith('os.') ||
                key.startsWith('process.') ||
                key.startsWith('telemetry.')
            ) {
                delete attributes[key];
            }
        });
    }

    return report;
}
