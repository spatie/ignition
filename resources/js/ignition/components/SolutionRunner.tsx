// @ts-nocheck @TODO: remove
import React, { useState } from 'react';
import { ErrorSolution } from 'resources/js/shared/types';

type Props = {
    solution: ErrorSolution;
};

export default function SolutionRunner({ solution }: Props) {
    /* @TODO: copy solution execution logic from facade/ignition:
        https://github.com/facade/ignition/blob/508d80f91de953617977e5666f8953669b6e81f2/resources/js/components/Solutions/SolutionCard.vue */

    const [isRunningSolution, setIsRunningSolution] = useState(false);
    const [canExecuteSolutions, setCanExecuteSolutions] = useState(false);
    const [wasExecutionSuccessful, setWasExecutionSuccessful] = useState(false);

    function executeSolution() {}

    return (
        <div>
            <p v-if="canExecuteSolutions === null" className="py-4 text-sm italic">
                Loading...
            </p>
            <div className="mt-4">
                {canExecuteSolutions && wasExecutionSuccessful === null && (
                    <button
                        disabled={isRunningSolution}
                        onClick={executeSolution}
                        className="button-secondary button-lg bg-tint-300 hover:bg-tint-400"
                    >
                        {isRunningSolution ? <span>Running...</span> : <span>{solution.run_button_text}</span>}
                    </button>
                )}

                {wasExecutionSuccessful ? (
                    <p>
                        <strong className="font-semibold">The solution was executed successfully.</strong>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                location.reload();
                            }}
                            className="link-solution"
                        >
                            Refresh now.
                        </a>
                    </p>
                ) : (
                    <p>
                        Something went wrong when executing the solution. Please try refreshing the page and try again.
                    </p>
                )}
            </div>
        </div>
    );
}
