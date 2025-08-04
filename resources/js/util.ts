import isString from 'lodash/isString';

export function stringifyOccurrenceData(value: any): string {
    if (value === undefined) {
        return 'undefined';
    }

    if (isString(value)) {
        try {
            value = JSON.parse(value);
        } catch (error) {}
    }

    return JSON.stringify(value, null, 4);
}

export function copyToClipboard(text: string) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

export function curlCommand(request: any, requestData: any, headers: any): null | string {
    if (!request.url || !request.method) {
        return null;
    }

    const curlLines = [`curl "${request.url}"`];

    curlLines.push(`   -X ${request.method}`);

    Object.entries(headers || {}).map(function ([key, value]) {
        curlLines.push(`   -H '${key}: ${value}'`);
    });

    const curlBodyString = curlBody(requestData, headers);

    if (curlBodyString) {
        curlLines.push(curlBodyString);
    }

    return curlLines.join(' \\\n');
}

function curlBody(requestData: any, headers: any) {
    if (!requestData.body) {
        return null;
    }

    if (headers['content-type']?.[0]?.includes('application/json')) {
        return `   -d ${JSON.stringify(requestData.body)}`;
    }

    const formValues = Object.entries(requestData.body || {}).map(function ([key, value]) {
        return `-F '${key}=${value}'`;
    });

    return `   ${formValues.join(' ')}`;
}
