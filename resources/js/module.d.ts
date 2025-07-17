interface Window {
    flare?: typeof import('@flareapp/flare-client').flare;
    ignite: (data: import('resources/js//types').IgniteData) => void;
    shareableReport?: import('resources/js/types').IgniteData['shareableReport'];
}

declare module 'react-markdown/react-markdown.min.js' {
    const ReactMarkdown: React.FC<React.PropsWithChildren<{ components: import('react-markdown').Components }>>;

    export default ReactMarkdown;
}
