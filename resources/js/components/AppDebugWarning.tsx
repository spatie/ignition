import { useContext } from 'react';
import { ErrorOccurrenceContext } from 'ignition-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faWarning } from '@fortawesome/free-solid-svg-icons';

export default function AppDebugWarning() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    if (! errorOccurrence.attributes['service.stage'] || errorOccurrence.attributes['service.stage'] === 'local') {
        return null;
    }

    return (
        <section className="lg:flex items-stretch ~bg-white shadow-lg">
            <div className='lg:w-2/5 flex-none flex items-center min-w-0 px-6 sm:px-10 py-8 bg-red-500 text-red-50'>
                <h2 className="min-w-0 truncate text-xl font-semibold leading-snug">
                    Ignition is not running in a local environment
                </h2>
            </div>
            <div className="flex-grow px-6 sm:px-10 py-8 bg-red-600 text-red-100">
                <p className="text-base">
                    <FontAwesomeIcon icon={faWarning} className="text-sm opacity-50" />  This could make your application vulnerable for malicious users.
                </p>
            </div>
        </section>
    );
}
