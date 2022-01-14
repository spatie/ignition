import React, { useContext } from 'react';
import { ErrorOccurrenceContext } from '@flareapp/ignition-ui';
import mapValues from 'lodash/mapValues';
import keyBy from 'lodash/keyBy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';

export default function AppDebugWarning() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const env = mapValues(keyBy(errorOccurrence.context_items['env'] || [], 'name'), 'value');

    if (env.app_env === 'local' || !env.app_debug) {
        return null;
    }

    return (
        <section className="bg-red-500 text-white px-6 sm:px-10 py-8 ">
            <h2 className="mb-4 min-w-0 truncate font-bold leading-snug">
                <code>APP_DEBUG</code> is set to <code>true</code> while <code>APP_ENV</code> is not <code>local</code>
            </h2>
            <p className="text-base">
                This could make your application vulnerable to remote execution.&nbsp;
                <br/>
                <a
                    className="mt-2 underline inline-flex items-center gap-2"
                    target="_blank"
                    rel="noopener"
                    href="https://flareapp.io/docs/ignition-for-laravel/security"
                >
                    <FontAwesomeIcon icon={faShieldAlt} className="text-sm opacity-50" />
                    Read more about Ignition security
                </a>
            </p>
        </section>
    );
}
