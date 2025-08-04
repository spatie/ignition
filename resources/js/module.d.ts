interface Window {
    flare?: typeof import('@flareapp/flare-client').flare;
    ignite: (data: import('resources/js//types').IgniteData) => void;
    shareableReport?: import('resources/js/types').IgniteData['shareableReport'];
}
