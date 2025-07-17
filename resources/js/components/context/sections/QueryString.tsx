import React from 'react';
import ContextList from '../ContextList';
import { RequestDataContext } from '../../../types';

type Props = {
    requestData: RequestDataContext;
};

export default function QueryString({ requestData }: Props) {
    return <ContextList items={requestData.queryString || {}} />;
}
