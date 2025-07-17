import React, { useContext } from 'react';
import RelaxedFullyQualifiedClassName from '../ui/RelaxedFullyQualifiedClassName';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import ErrorOccurrenceContext from 'components/context/ErrorOccurrenceContext';

export default function ExceptionSelector() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);
    const multipleExceptions = false;

    if (!multipleExceptions) {
        return (
            <span className="py-1 px-4 items-center flex gap-3 rounded-sm ~bg-gray-500/5">
                <RelaxedFullyQualifiedClassName path={errorOccurrence.exception_class} />
            </span>
        );
    }

    return (
        <button className="group h-10 px-4 items-center flex gap-3 rounded-sm ~bg-gray-500/5">
            <p className="flex flex-wrap leading-tight">
                <RelaxedFullyQualifiedClassName path={errorOccurrence.exception_class} />
            </p>
            <FontAwesomeIcon icon={faAngleDown} className="group-hover:text-indigo-500 text-sm" />
        </button>
    );
}
