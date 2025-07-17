// Based on https://github.com/highlightjs/highlight.js/blob/main/src/languages/php-template.js

export default function blade(hljs: any) {
    return {
        name: 'Blade',
        case_insensitive: true,
        subLanguage: 'php-template',
        contains: [
            hljs.COMMENT(/\{\{--/, /--\}\}/),

            // {{ $likeThis }}
            {
                className: 'template-variable',
                begin: /\{\{/,
                starts: {
                    end: /\}\}/,
                    returnEnd: true,
                    subLanguage: 'php',
                },
            },
            {
                className: 'template-variable',
                begin: /\}\}/,
            },

            // {{{ $likeThis }}}
            {
                className: 'template-variable',
                begin: /\{\{\{/,
                starts: {
                    end: /\}\}\}/,
                    returnEnd: true,
                    subLanguage: 'php',
                },
            },
            {
                className: 'template-variable',
                begin: /\}\}\}/,
            },

            // {!! $hello !!}
            {
                className: 'template-variable',
                begin: /\{!!/,
                starts: {
                    end: /!!\}/,
                    returnEnd: true,
                    subLanguage: 'php',
                },
            },
            {
                className: 'template-variable',
                begin: /!!\}/,
            },

            // @php($a = 2)
            {
                className: 'template-tag',
                begin: /@php\(/,
                starts: {
                    end: /\)/,
                    returnEnd: true,
                    subLanguage: 'php',
                },
                relevance: 15,
            },

            // @php $a = 1 @endphp
            {
                className: 'template-tag',
                begin: /@php/,
                starts: {
                    end: /@endphp/,
                    returnEnd: true,
                    subLanguage: 'php',
                },
                relevance: 10,
            },

            // :blade-value="$phpVar"
            {
                className: 'attr',
                begin: /:[\w-]+="/,
                starts: {
                    end: /"(?=\s|\n|\/)/,
                    returnEnd: true,
                    subLanguage: 'php',
                },
            },

            // @something
            {
                begin: /@\w+/,
                end: /\W/,
                excludeEnd: true,
                className: 'template-tag',
            },
        ],
    };
}
