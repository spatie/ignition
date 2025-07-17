/**
 * https://github.com/IonicaBizau/git-url-parse is broken. Using a local copy.
 * @see https://github.com/IonicaBizau/git-url-parse/issues/130#issuecomment-890309747
 */

// @ts-ignore
import isSsh from 'is-ssh';
// @ts-ignore
import parsePath from 'parse-path';

export default function gitUrlParse(url: string) {
    if (typeof url !== 'string') {
        throw new Error('The url must be a string.');
    }

    let urlInfo = gitUp(url),
        sourceParts = urlInfo.resource.split('.'),
        splits = null;
    // @ts-ignore
    urlInfo.toString = function (type) {
        return gitUrlParse.stringify(this, type);
    };

    urlInfo.source =
        sourceParts.length > 2
            ? sourceParts.slice(1 - sourceParts.length).join('.')
            : (urlInfo.source = urlInfo.resource);

    // Note: Some hosting services (e.g. Visual Studio Team Services) allow whitespace characters
    // in the repository and owner names so we decode the URL pieces to get the correct result
    urlInfo.git_suffix = /\.git$/.test(urlInfo.pathname);
    urlInfo.name = decodeURIComponent(urlInfo.pathname.replace(/^\//, '').replace(/\.git$/, ''));
    urlInfo.owner = decodeURIComponent(urlInfo.user);

    switch (urlInfo.source) {
        case 'git.cloudforge.com':
            urlInfo.owner = urlInfo.user;
            urlInfo.organization = sourceParts[0];
            urlInfo.source = 'cloudforge.com';
            break;
        case 'visualstudio.com':
            // Handle VSTS SSH URLs
            if (urlInfo.resource === 'vs-ssh.visualstudio.com') {
                splits = urlInfo.name.split('/');
                if (splits.length === 4) {
                    urlInfo.organization = splits[1];
                    urlInfo.owner = splits[2];
                    urlInfo.name = splits[3];
                    urlInfo.full_name = splits[2] + '/' + splits[3];
                }
                break;
            } else {
                splits = urlInfo.name.split('/');
                if (splits.length === 2) {
                    urlInfo.owner = splits[1];
                    urlInfo.name = splits[1];
                    urlInfo.full_name = '_git/' + urlInfo.name;
                } else if (splits.length === 3) {
                    urlInfo.name = splits[2];
                    if (splits[0] === 'DefaultCollection') {
                        urlInfo.owner = splits[2];
                        urlInfo.organization = splits[0];
                        urlInfo.full_name = urlInfo.organization + '/_git/' + urlInfo.name;
                    } else {
                        urlInfo.owner = splits[0];
                        urlInfo.full_name = urlInfo.owner + '/_git/' + urlInfo.name;
                    }
                } else if (splits.length === 4) {
                    urlInfo.organization = splits[0];
                    urlInfo.owner = splits[1];
                    urlInfo.name = splits[3];
                    urlInfo.full_name = urlInfo.organization + '/' + urlInfo.owner + '/_git/' + urlInfo.name;
                }
                break;
            }

        // Azure DevOps (formerly Visual Studio Team Services)
        case 'dev.azure.com':
        case 'azure.com':
            if (urlInfo.resource === 'ssh.dev.azure.com') {
                splits = urlInfo.name.split('/');
                if (splits.length === 4) {
                    urlInfo.organization = splits[1];
                    urlInfo.owner = splits[2];
                    urlInfo.name = splits[3];
                }
                break;
            } else {
                splits = urlInfo.name.split('/');
                if (splits.length === 5) {
                    urlInfo.organization = splits[0];
                    urlInfo.owner = splits[1];
                    urlInfo.name = splits[4];
                    urlInfo.full_name = '_git/' + urlInfo.name;
                } else if (splits.length === 3) {
                    urlInfo.name = splits[2];
                    if (splits[0] === 'DefaultCollection') {
                        urlInfo.owner = splits[2];
                        urlInfo.organization = splits[0];
                        urlInfo.full_name = urlInfo.organization + '/_git/' + urlInfo.name;
                    } else {
                        urlInfo.owner = splits[0];
                        urlInfo.full_name = urlInfo.owner + '/_git/' + urlInfo.name;
                    }
                } else if (splits.length === 4) {
                    urlInfo.organization = splits[0];
                    urlInfo.owner = splits[1];
                    urlInfo.name = splits[3];
                    urlInfo.full_name = urlInfo.organization + '/' + urlInfo.owner + '/_git/' + urlInfo.name;
                }
                if (urlInfo.query && urlInfo.query['path']) {
                    urlInfo.filepath = urlInfo.query['path'].replace(/^\/+/g, ''); // Strip leading slash (/)
                }
                if (urlInfo.query && urlInfo.query['version']) {
                    // version=GB<branch>
                    urlInfo.ref = urlInfo.query['version'].replace(/^GB/, ''); // remove GB
                }
                break;
            }
        default:
            splits = urlInfo.name.split('/');
            let nameIndex = splits.length - 1;
            if (splits.length >= 2) {
                const dashIndex = splits.indexOf('-', 2);
                const blobIndex = splits.indexOf('blob', 2);
                const treeIndex = splits.indexOf('tree', 2);
                const commitIndex = splits.indexOf('commit', 2);
                const srcIndex = splits.indexOf('src', 2);
                const rawIndex = splits.indexOf('raw', 2);
                nameIndex =
                    dashIndex > 0
                        ? dashIndex - 1
                        : blobIndex > 0
                        ? blobIndex - 1
                        : treeIndex > 0
                        ? treeIndex - 1
                        : commitIndex > 0
                        ? commitIndex - 1
                        : srcIndex > 0
                        ? srcIndex - 1
                        : rawIndex > 0
                        ? rawIndex - 1
                        : nameIndex;

                urlInfo.owner = splits.slice(0, nameIndex).join('/');
                urlInfo.name = splits[nameIndex];
                if (commitIndex) {
                    urlInfo.commit = splits[nameIndex + 2];
                }
            }

            urlInfo.ref = '';
            urlInfo.filepathtype = '';
            urlInfo.filepath = '';
            const offsetNameIndex =
                splits.length > nameIndex && splits[nameIndex + 1] === '-' ? nameIndex + 1 : nameIndex;
            if (
                splits.length > offsetNameIndex + 2 &&
                ['raw', 'src', 'blob', 'tree'].indexOf(splits[offsetNameIndex + 1]) >= 0
            ) {
                urlInfo.filepathtype = splits[offsetNameIndex + 1];
                urlInfo.ref = splits[offsetNameIndex + 2];
                if (splits.length > offsetNameIndex + 3) {
                    urlInfo.filepath = splits.slice(offsetNameIndex + 3).join('/');
                }
            }
            urlInfo.organization = urlInfo.owner;
            break;
    }

    if (!urlInfo.full_name) {
        urlInfo.full_name = urlInfo.owner;
        if (urlInfo.name) {
            urlInfo.full_name && (urlInfo.full_name += '/');
            urlInfo.full_name += urlInfo.name;
        }
    }
    // Bitbucket Server
    if (urlInfo.owner.startsWith('scm/')) {
        urlInfo.source = 'bitbucket-server';
        urlInfo.owner = urlInfo.owner.replace('scm/', '');
        urlInfo.organization = urlInfo.owner;
        urlInfo.full_name = `${urlInfo.owner}/${urlInfo.name}`;
    }

    const bitbucket = /(projects|users)\/(.*?)\/repos\/(.*?)((\/.*$)|$)/;
    const matches = bitbucket.exec(urlInfo.pathname);
    if (matches != null) {
        urlInfo.source = 'bitbucket-server';
        if (matches[1] === 'users') {
            urlInfo.owner = '~' + matches[2];
        } else {
            urlInfo.owner = matches[2];
        }

        urlInfo.organization = urlInfo.owner;
        urlInfo.name = matches[3];

        splits = matches[4].split('/');
        if (splits.length > 1) {
            if (['raw', 'browse'].indexOf(splits[1]) >= 0) {
                urlInfo.filepathtype = splits[1];
                if (splits.length > 2) {
                    urlInfo.filepath = splits[2];
                }
            } else if (splits[1] === 'commits' && splits.length > 2) {
                urlInfo.commit = splits[2];
            }
        }
        urlInfo.full_name = `${urlInfo.owner}/${urlInfo.name}`;

        if (urlInfo.query.at) {
            urlInfo.ref = urlInfo.query.at;
        } else {
            urlInfo.ref = '';
        }
    }
    return urlInfo;
}

/**
 * stringify
 * Stringifies a `GitUrl` object.
 *
 * @name stringify
 * @function
 * @param {GitUrl} obj The parsed Git url object.
 * @param {String} type The type of the stringified url (default `obj.protocol`).
 * @return {String} The stringified url.
 */
// @ts-ignore
gitUrlParse.stringify = function (obj, type) {
    type = type || (obj.protocols && obj.protocols.length ? obj.protocols.join('+') : obj.protocol);
    const port = obj.port ? `:${obj.port}` : '';
    const user = obj.user || 'git';
    const maybeGitSuffix = obj.git_suffix ? '.git' : '';
    switch (type) {
        case 'ssh':
            if (port) return `ssh://${user}@${obj.resource}${port}/${obj.full_name}${maybeGitSuffix}`;
            else return `${user}@${obj.resource}:${obj.full_name}${maybeGitSuffix}`;
        case 'git+ssh':
        case 'ssh+git':
        case 'ftp':
        case 'ftps':
            return `${type}://${user}@${obj.resource}${port}/${obj.full_name}${maybeGitSuffix}`;
        case 'http':
        case 'https':
            const auth = obj.token
                ? buildToken(obj)
                : obj.user && (obj.protocols.includes('http') || obj.protocols.includes('https'))
                ? `${obj.user}@`
                : '';
            return `${type}://${auth}${obj.resource}${port}/${buildPath(obj)}${maybeGitSuffix}`;
        default:
            return obj.href;
    }
};

/*!
 * buildToken
 * Builds OAuth token prefix (helper function)
 *
 * @name buildToken
 * @function
 * @param {GitUrl} obj The parsed Git url object.
 * @return {String} token prefix
 */
// @ts-ignore
function buildToken(obj) {
    switch (obj.source) {
        case 'bitbucket.org':
            return `x-token-auth:${obj.token}@`;
        default:
            return `${obj.token}@`;
    }
}

// @ts-ignore
function buildPath(obj) {
    switch (obj.source) {
        case 'bitbucket-server':
            return `scm/${obj.full_name}`;
        default:
            return `${obj.full_name}`;
    }
}

// @ts-ignore
function parseUrl(url) {
    if (typeof url !== 'string' || !url.trim()) {
        throw new Error('Invalid url.');
    }

    return parsePath(url);
}

// @ts-ignore
function gitUp(input) {
    let output = parseUrl(input);
    output.token = '';

    let splits = output.user.split(':');
    if (splits.length === 2) {
        if (splits[1] === 'x-oauth-basic') {
            output.token = splits[0];
        } else if (splits[0] === 'x-token-auth') {
            output.token = splits[1];
        }
    }

    if (isSsh(output.protocols) || isSsh(input)) {
        output.protocol = 'ssh';
    } else if (output.protocols.length) {
        output.protocol = output.protocols[0];
    } else {
        output.protocol = 'file';
    }

    output.href = output.href.replace(/\/$/, '');
    return output;
}
