import {useContext} from 'react';
import {EditorOption, IgnitionConfig} from "../types";
import IgnitionConfigContext from 'components/context/IgnitionConfigContext';

type Props = {
    file: string;
    lineNumber?: number;
};

export default function useEditorUrl({file, lineNumber = 1}: Props): {url: string; clipboard: boolean;} {
    const {ignitionConfig: config} = useContext(IgnitionConfigContext);

    file = (config.remoteSitesPath || '').length > 0 && (config.localSitesPath || '').length > 0
        ? file.replace(config.remoteSitesPath, config.localSitesPath)
        : file;

    const editorConfig = getEditorConfig(config);

    if (! editorConfig) {
        return {
            url: file + ':' + lineNumber,
            clipboard: true,
        }
    }

    if (editorConfig.clipboard) {
        // Don't URL encode values for clipboard
        let url = editorConfig.url.replace('%path', file).replace('%line', lineNumber.toString());

        return {
            url: url,
            clipboard: true,
        }
    }

    let url = editorConfig.url.replace('%path', encodeURIComponent(file)).replace('%line', encodeURIComponent(lineNumber));

    return {
        url: url,
        clipboard: false,
    }
}

function getEditorConfig(config: IgnitionConfig): null|EditorOption {
    const editor = config.editor || '';

    if (! Object.keys(config.editorOptions || {}).includes(editor)) {
        console.warn(`Editor '${editor}' is not supported. Support editors are: ${Object.keys(config.editorOptions || {}).join(', ')}`);

        return null;
    }

    return config.editorOptions![editor];
}
