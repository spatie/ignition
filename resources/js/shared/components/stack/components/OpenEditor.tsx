import React, { useContext } from 'react';
import { igniteDataContext } from 'resources/js/ignition/igniteDataContext';
import Icon from 'resources/js/shared/components/Icon';
import { IgniteData } from 'resources/js/shared/types';

type Props = {
    file: string;
    lineNumber: number;
    className?: string;
};

export default function OpenEditor({ file, lineNumber, className = '' }: Props) {
    const { config } = useContext(igniteDataContext);
    let editorUrl;
    if (config) {
        editorUrl = getEditorUrl({ config: { ...config, editor: 'vscode' }, file, lineNumber });
    }

    if (!editorUrl) {
        return null;
    }

    return (
        <a className={`${className}`} href={editorUrl}>
            <Icon name="pencil" className="ml-2" />
        </a>
    );
}

// For Ignition
type getEditorUrlProps = {
    config: IgniteData['config'];
    file: string;
    lineNumber?: number;
};

function getEditorUrl({ config, file, lineNumber = 1 }: getEditorUrlProps) {
    const editor = config.editor;
    const editors: Record<string, string> = {
        sublime: 'subl://open?url=file://%path&line=%line',
        textmate: 'txmt://open?url=file://%path&line=%line',
        emacs: 'emacs://open?url=file://%path&line=%line',
        macvim: 'mvim://open/?url=file://%path&line=%line',
        phpstorm: 'phpstorm://open?file=%path&line=%line',
        idea: 'idea://open?file=%path&line=%line',
        vscode: 'vscode://file/%path:%line',
        'vscode-insiders': 'vscode-insiders://file/%path:%line',
        'vscode-remote': 'vscode://vscode-remote/%path:%line',
        'vscode-insiders-remote': 'vscode-insiders://vscode-remote/%path:%line',
        atom: 'atom://core/open/file?filename=%path&line=%line',
        nova: 'nova://core/open/file?filename=%path&line=%line',
        netbeans: 'netbeans://open/?f=%path:%line',
        xdebug: 'xdebug://%path@%line',
    };

    file =
        (config.remoteSitesPath || '').length > 0 && (config.localSitesPath || '').length > 0
            ? file.replace(config.remoteSitesPath, config.localSitesPath)
            : file;

    if (!Object.keys(editors).includes(editor)) {
        console.error(`'${editor}' is not supported. Support editors are: ${Object.keys(editors).join(', ')}`);

        return null;
    }

    return editors[editor].replace('%path', encodeURIComponent(file)).replace('%line', encodeURIComponent(lineNumber));
}
