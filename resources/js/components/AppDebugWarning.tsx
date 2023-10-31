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
        <section className="lg:flex items-stretch ~bg-white shadow-lg">
            <div className='lg:w-1/3 flex-none flex items-center min-w-0 px-6 sm:px-10 py-8 bg-red-500 text-red-50'>
                <h2 className="min-w-0 truncate text-xl font-semibold leading-snug">
                    <code className="mr-0.5">APP_DEBUG</code> is set to <code className="mx-0.5">true</code> while
                    <br/>
                    <code className="mr-0.5">APP_ENV</code> is not <code className="mx-0.5">local</code>
                </h2>
            </div>
            <div className="flex-grow px-6 sm:px-10 py-8 bg-red-600 text-red-100">
                <p className="text-base">
                    This could make your application vulnerable to remote execution.&nbsp;
                    <br/>
                    <a
                        className="mt-1.5 underline inline-flex items-center gap-2"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://flareapp.io/docs/ignition-for-laravel/security"
                    >
                        <FontAwesomeIcon icon={faShieldAlt} className="text-sm opacity-50" />
                        Read more about Ignition security
                    </a>
                </p>
            </div>
        </section>
    );
}
