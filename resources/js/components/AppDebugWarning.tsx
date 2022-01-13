import React, { useContext } from 'react';
import { ErrorOccurrenceContext } from '@flareapp/ignition-ui';
import mapValues from 'lodash/mapValues';
import keyBy from 'lodash/keyBy';

export default function AppDebugWarning() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const env = mapValues(keyBy(errorOccurrence.context_items['env'] || [], 'name'), 'value');

    if (env.app_env === 'local' || !env.app_debug) {
        return null;
    }

    return (
        <section className="shadow-lg bg-red-500 text-white px-6 sm:px-10 py-8 ">
            <p>
                <code>APP_DEBUG</code> is set to <code>true</code> while <code>APP_ENV</code> is not <code>local</code>
            </p>
            <p className="text-base">
                This could make your application vulnerable to remote execution.
                <a
                    className="underline"
                    target="_blank"
                    rel="noopener"
                    href="https://flareapp.io/docs/ignition-for-laravel/security"
                >
                    Read more about Ignition security.
                </a>
            </p>
        </section>
    );
}
