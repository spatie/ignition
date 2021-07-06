import React, { useContext, useState, useEffect } from 'react';
import { igniteDataContext } from 'resources/js/ignition/igniteDataContext';
import { ErrorSolution } from 'resources/js/shared/types';

type Props = {
    solution: ErrorSolution;
};

export default function SolutionRunner({ solution }: Props) {
    const { config } = useContext(igniteDataContext);

    const [isRunningSolution, setIsRunningSolution] = useState(false);
    const [canExecuteSolutions, setCanExecuteSolutions] = useState(() => config.enableRunnableSolutions);
    const [wasExecutionSuccessful, setWasExecutionSuccessful] = useState<boolean | null>(null);

    useEffect(() => {
        try {
            (async () => {
                if (!solution.execute_endpoint) {
                    return;
                }

                const healthCheck = await (
                    await fetch(solution.execute_endpoint.replace('execute-solution', 'health-check'))
                ).json();

                setCanExecuteSolutions(healthCheck.can_execute_commands);
            })();
        } catch (error) {
            setCanExecuteSolutions(false);
        }
    }, []);

    async function executeSolution() {
        if (isRunningSolution) {
            return;
        }

        try {
            setIsRunningSolution(true);

            if (!solution.execute_endpoint) {
                return;
            }

            const response = await fetch(solution.execute_endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({ solution: solution.class, parameters: solution.run_parameters }),
            });

            setWasExecutionSuccessful(response.status >= 200 && response.status < 300);
        } catch (error) {
            console.error(error);
            setWasExecutionSuccessful(false);
        } finally {
            setIsRunningSolution(false);
        }
    }

    /* @todo-adriaan, code is already in this repo in `useSolutions.ts`
    function toggleSolutions() {
        toggleSolutions() {
            if (!this.isHidingSolutions) {
                this.$refs.solutionCard.classList.add('solution-hiding');
                animationTimeout = window.setTimeout(() => {
                    this.$refs.solutionCard.classList.remove('solution-hiding');
                    this.toggleHidingSolutions();
                }, 100);
            } else {
                window.clearTimeout(animationTimeout);
                this.toggleHidingSolutions();
            }
        },
        toggleHidingSolutions() {
            if (this.isHidingSolutions) {
                document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
                this.isHidingSolutions = false;
                return;
            }
            const expires = new Date();
            expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000);
            document.cookie = `${cookieName}=true;expires=${expires.toUTCString()};path=/;`;
            this.isHidingSolutions = true;
        },
        hasHideSolutionsCookie() {
            return document.cookie.includes(cookieName);
        },
    }
    */

    function refresh(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.preventDefault();
        location.reload();
    }

    return (
        <div>
            <div className="mt-4">
                {canExecuteSolutions && wasExecutionSuccessful === null && (
                    <button
                        disabled={isRunningSolution}
                        onClick={executeSolution}
                        className="mb-4 button-secondary button-lg bg-tint-300 hover:bg-tint-400"
                    >
                        {isRunningSolution ? (
                            <span>Running...</span>
                        ) : (
                            <span>{solution.run_button_text || 'Run solution'}</span>
                        )}
                    </button>
                )}

                {wasExecutionSuccessful === true && (
                    <p>
                        <strong className="font-semibold">The solution was executed successfully.</strong>
                        <a className="ml-2 link-solution" href="#" onClick={refresh}>
                            Refresh now.
                        </a>
                    </p>
                )}

                {wasExecutionSuccessful === false && (
                    <p>
                        Something went wrong when executing the solution. Please try refreshing the page and try again.{' '}
                        <a className="ml-2" href="#" onClick={refresh}></a>
                    </p>
                )}
            </div>
        </div>
    );
}
