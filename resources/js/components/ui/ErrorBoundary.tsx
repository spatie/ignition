import React from 'react';
import ErrorBoundaryCard from './ErrorBoundaryCard';

type Props = {
    children: React.ReactNode;
    fallbackComponent?: (githubLink: string) => React.ReactNode;
};

type State = {
    error: null | Error;
};

export default class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { error: error };
    }

    render() {
        const { error } = this.state;

        if (error) {
            let githubLink = 'https://github.com/spatie/ignition/issues';

            if (error instanceof Error) {
                const title = `${error.name}: ${error.message}`;
                const body = `
**Please include some context and the contents of the console in your browser's developer tools.**

## JavaScript Error
\`\`\`
${error.stack}
\`\`\`

## Reproduction Steps
Please tell us what you were doing when this error occurred, so we can more easily debug it and find a solution.

1. …

## User Agent
\`\`\`
${navigator.userAgent}
\`\`\`
`;

                githubLink = `https://github.com/spatie/ignition/issues/new?title=${title}&labels=bug&body=${encodeURIComponent(body)}`;
            }

            return this.props.fallbackComponent?.(githubLink) || <ErrorBoundaryCard githubLink={githubLink} />;
        }

        return this.props.children;
    }
}
