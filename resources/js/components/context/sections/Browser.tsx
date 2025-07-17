import React from 'react';
import {  RequestContext } from '../../../types';
import CodeSnippet from "../../ui/CodeSnippet";

type Props = {
    request: RequestContext;
};

export default function Browser({ request }: Props) {
    if (!request.useragent) {
        return null;
    }

    return <CodeSnippet value={request.useragent} />;
}
