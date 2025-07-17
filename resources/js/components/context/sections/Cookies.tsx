import React from 'react';
import ContextList from '../ContextList';
import { CookiesContext } from '../../../types';

type Props = {
    cookies: CookiesContext;
};

export default function Cookies({ cookies }: Props) {
    return <ContextList items={cookies} />;
}
