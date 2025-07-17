import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from 'tailwindcss/defaultConfig';

const {
    theme: { colors },
} = resolveConfig(tailwindConfig);

const dark = {
    hljs: {},
    'hljs-subst': {
        color: colors.gray[100],
    },
    'hljs-comment': {
        color: colors.gray[500],
    },
    'hljs-keyword': {
        fontWeight: 'bold',
        color: colors.blue[300],
    },
    'hljs-attribute': {
        fontWeight: 'bold',
    },
    'hljs-selector-tag': {
        fontWeight: 'bold',
    },
    'hljs-meta-keyword': {
        fontWeight: 'bold',
        color: colors.blue[300],
    },
    'hljs-doctag': {
        fontWeight: 'bold',
    },
    'hljs-name': {
        fontWeight: 'bold',
    },
    'hljs-type': {
        color: colors.emerald[300],
    },
    'hljs-string': {
        color: colors.red[300],
    },
    'hljs-number': {
        color: colors.emerald[300],
    },
    'hljs-selector-id': {
        color: colors.yellow[200],
    },
    'hljs-selector-class': {
        color: colors.yellow[200],
    },
    'hljs-quote': {
        color: colors.emerald[300],
    },
    'hljs-template-tag': {
        color: colors.emerald[300],
    },
    'hljs-deletion': {
        color: colors.emerald[300],
    },
    'hljs-title': {
        color: colors.emerald[300],
        fontWeight: 'bold',
    },
    'hljs-section': {
        color: colors.emerald[300],
        fontWeight: 'bold',
    },
    'hljs-regexp': {
        color: colors.blue[200],
    },
    'hljs-symbol': {
        color: colors.blue[200],
    },
    'hljs-variable': {
        color: colors.blue[200],
    },
    'hljs-template-variable': {
        color: colors.blue[200],
    },
    'hljs-link': {
        color: colors.blue[200],
    },
    'hljs-selector-attr': {
        color: colors.blue[200],
    },
    'hljs-selector-pseudo': {
        color: colors.blue[200],
    },
    'hljs-literal': {
        color: colors.violet[400],
    },
    'hljs-built_in': {
        color: colors.blue[300],
    },
    'hljs-bullet': {
        color: colors.blue[300],
    },
    'hljs-code': {
        color: colors.blue[300],
    },
    'hljs-addition': {
        color: colors.blue[300],
    },
    'hljs-meta': {
        color: colors.blue[400],
    },
    'hljs-meta-string': {
        color: colors.blue[200],
    },
    'hljs-emphasis': {
        fontStyle: 'italic',
    },
    'hljs-strong': {
        fontWeight: 'bold',
    },
};

export default dark;
