import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from 'tailwindcss/defaultConfig';

const {
    theme: { colors },
} = resolveConfig(tailwindConfig);

const light = {
    hljs: {},
    'hljs-subst': {
        color: colors.gray['800'],
    },
    'hljs-comment': {
        color: colors.gray['500'],
    },
    'hljs-keyword': {
        fontWeight: 'bold',
        color: colors.indigo['600'],
    },
    'hljs-attribute': {
        fontWeight: 'bold',
        color: colors.red['500'],
    },
    'hljs-selector-tag': {
        fontWeight: 'bold',
    },
    'hljs-meta-keyword': {
        fontWeight: 'bold',
        color: colors.indigo['600'],
    },
    'hljs-doctag': {
        fontWeight: 'bold',
    },
    'hljs-name': {
        fontWeight: 'bold',
    },
    'hljs-type': {
        color: colors.emerald['800'],
    },
    'hljs-string': {
        color: colors.red['700'],
    },
    'hljs-number': {
        color: colors.emerald['800'],
    },
    'hljs-selector-id': {
        color: colors.red['700'],
    },
    'hljs-selector-class': {
        color: colors.red['700'],
    },
    'hljs-quote': {
        color: colors.emerald['800'],
    },
    'hljs-template-tag': {
        color: colors.emerald['800'],
    },
    'hljs-deletion': {
        color: colors.emerald['800'],
    },
    'hljs-title': {
        color: colors.emerald['800'],
        fontWeight: 'bold',
    },
    'hljs-section': {
        color: colors.emerald['800'],
        fontWeight: 'bold',
    },
    'hljs-regexp': {
        color: colors.emerald['600'],
    },
    'hljs-symbol': {
        color: colors.gray['800'],
    },
    'hljs-variable': {
        color: colors.emerald['600'],
    },
    'hljs-template-variable': {
        color: colors.emerald['600'],
    },
    'hljs-link': {
        color: colors.emerald['600'],
    },
    'hljs-selector-attr': {
        color: colors.emerald['600'],
    },
    'hljs-selector-pseudo': {
        color: colors.emerald['600'],
    },
    'hljs-literal': {
        color: colors.violet['700'],
    },
    'hljs-built_in': {
        color: colors.indigo['400'],
    },
    'hljs-bullet': {
        color: colors.indigo['400'],
    },
    'hljs-code': {
        color: colors.indigo['400'],
    },
    'hljs-addition': {
        color: colors.indigo['400'],
    },
    'hljs-meta': {
        color: colors.blue['600'],
    },
    'hljs-meta-string': {
        color: colors.blue['400'],
    },
    'hljs-emphasis': {
        fontStyle: 'italic',
    },
    'hljs-strong': {
        fontWeight: 'bold',
    },
};

export default light;
