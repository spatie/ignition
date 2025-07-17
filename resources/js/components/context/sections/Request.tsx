import React, { useMemo } from 'react';
import CodeSnippet from '../../ui/CodeSnippet';
import { curlCommand } from '../../../util';
import Tag from 'components/ui/Tag';
import { HeadersContext, RequestContext, RequestDataContext } from '../../../types';

type Props = {
    request: RequestContext;
    requestData: RequestDataContext|null;
    headers: HeadersContext|null;
};

export default function Request({ request, requestData, headers }: Props) {
    const curl = useMemo(() => curlCommand(request, requestData, headers), [request, requestData, headers]);

    return (
        <div>
            <div className="text-lg font-semibold flex items-center gap-2">
                <span className="~text-indigo-600">{request.url}</span>
                {request.method && (
                    <Tag color={request.method.toUpperCase() == 'DELETE' ? 'red' : 'blue'}>
                        {request.method.toUpperCase()}
                    </Tag>
                )}
            </div>

            {curl && (
                <div className="mt-2">
                    <CodeSnippet value={curl} language="curl" />
                </div>
            )}
        </div>
    );
}
