import React from 'react';
import ContextList from '../ContextList';
import { SessionContext } from '../../../types';

type Props = {
    session: SessionContext;
};

export default function Session({ session }: Props) {
    return <ContextList items={session} />;
}
