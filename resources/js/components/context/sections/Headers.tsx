import React from 'react';
import ContextList from '../ContextList';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import omitBy from 'lodash/omitBy';
import { HeadersContext } from '../../../types';

type Props = {
    headers: HeadersContext;
};

export default function Headers({ headers }: Props) {
    let filteredHeaders = omitBy(headers, isNil);
    filteredHeaders = omitBy(filteredHeaders, isEmpty);

    return <ContextList items={filteredHeaders} />;
}
