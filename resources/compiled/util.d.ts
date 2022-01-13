import { ErrorOccurrence } from '@flareapp/ignition-ui';
export declare function getContextValues(errorOccurrence: ErrorOccurrence, group: string): {
    [name: string]: any;
};
export declare function stringifyOccurrenceData(value: any): string;
export declare function copyToClipboard(text: string): void;
export declare function curlCommand(request: any, requestData: any, headers: any): null | string;
