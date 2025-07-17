import React from 'react';
import { GitContext } from '../../../types';
import DefinitionList from '../../ui/DefinitionList';
import CodeSnippet from '../../ui/CodeSnippet';
import Alert from '../../ui/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import GitUrlParse from '../../../vendor/git-url-parse';
import SmallButton from 'components/ui/SmallButton';

type GitInfo = { resource: string | null; repoUrl: string | null; commitUrl: string | null };

function getGitInfo(remote?: string|null, hash?: string): GitInfo {
    if (!remote) {
        return {
            resource: null,
            repoUrl: null,
            commitUrl: null,
        };
    }

    const repoInfo = GitUrlParse(remote);
    const repoUrl = GitUrlParse.stringify({ ...repoInfo, git_suffix: false }, 'https');
    return {
        repoUrl,
        resource: repoInfo.resource,
        commitUrl: `${repoUrl}/commit/${hash}`,
    };
}

type Props = {
    git: GitContext;
};

export default function Git({ git }: Props) {
    const { commitUrl } = getGitInfo(git.remote, git.hash);

    return (
        <>
            {git.hash && git.message && (
                <div className="flex items-center gap-4">
                    <div className="flex-grow font-semibold">{git.message}</div>
                    <div className="~bg-gray-500/5 flex items-center">
                        <CodeSnippet transparent overflowX={false} value={git.hash} />
                        {commitUrl && (
                            <a href={commitUrl} target="_blank" rel="noopener noreferrer" className="mr-4">
                                <SmallButton>
                                    <FontAwesomeIcon className="group-hover:text-indigo-500" icon={faExternalLinkAlt} />
                                    View commit {git.hash.substr(0, 7)}
                                </SmallButton>
                            </a>
                        )}
                    </div>
                </div>
            )}
            {git.isDirty && (
                <div>
                    <Alert className="mt-4">
                        Last commit is dirty. (Un)staged changes have been made since this commit.
                    </Alert>
                </div>
            )}
            {git.tag && (
                <DefinitionList>
                    <DefinitionList.Row label="Latest tag" value={git.tag} />
                </DefinitionList>
            )}
        </>
    );
}
