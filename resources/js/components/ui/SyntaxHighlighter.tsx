// @ts-ignore
import { createElement, Light as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import php from 'react-syntax-highlighter/dist/esm/languages/hljs/php';
// @ts-ignore
import phpTemplate from 'react-syntax-highlighter/dist/esm/languages/hljs/php-template';
// @ts-ignore
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
// @ts-ignore
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css';
// @ts-ignore
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
// @ts-ignore
import handlebars from 'react-syntax-highlighter/dist/esm/languages/hljs/handlebars';
import blade from 'languages/blade';
// @ts-ignore
import sql from 'react-syntax-highlighter/dist/esm/languages/hljs/sql';
// @ts-ignore
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
// @ts-ignore
import curl from 'highlightjs-curl';

// We need to register all styles and languages manually if we want to use the light
// export of the SyntaxHighlighter. Including all sub-languages used in e.g. Blade:
SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('php-template', phpTemplate);
SyntaxHighlighter.registerLanguage('blade', blade);
SyntaxHighlighter.registerLanguage('xml', xml);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('handlebars', handlebars);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('curl', curl);
SyntaxHighlighter.registerLanguage('json', json);

export default SyntaxHighlighter;
