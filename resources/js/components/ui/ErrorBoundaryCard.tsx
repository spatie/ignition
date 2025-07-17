import React from 'react';

type Props = {
    githubLink: string;
}

export default function ErrorBoundaryCard({githubLink}: Props) {
    return (
        <section className="flex flex-col flex-grow px-6 sm:px-10 py-8 bg-red-600 text-red-100 shadow-lg gap-3">
            <h2 className="text-xl font-semibold leading-snug">
                Something went wrong in Ignition!
            </h2>
            <p className="text-base">
                An error occurred in Ignition's UI. Please open an issue on{' '}
                <a href={githubLink} target="_blank" rel="noopener noreferrer" className="underline">the Ignition GitHub repo</a>{' '}
                and make sure to include any errors or warnings in the developer console.
            </p>
        </section>
    )
}
