import React from 'react';

export default function FlareIcon({className = ''}) {
    return (
        <svg height="58" viewBox="0 0 38 58" width="38" xmlns="http://www.w3.org/2000/svg"
             className={`w-4 h-5 ml-1.5 ${className}`}>
            <linearGradient id="a" x1="50%" x2="50%" y1="100%" y2="0%">
                <stop offset="0" stopColor="#48b987"/>
                <stop offset="1" stopColor="#137449"/>
            </linearGradient>
            <linearGradient id="b" x1="50%" x2="50%" y1="0%" y2="100%">
                <stop offset="0" stopColor="#66ffbc"/>
                <stop offset="1" stopColor="#218e5e"/>
            </linearGradient>
            <linearGradient id="c" x1="81.686741%" x2="17.119683%" y1="50%" y2="46.893103%">
                <stop offset="0" stopColor="#ccffe7" stopOpacity=".492379"/>
                <stop offset=".37576486" stopColor="#fff" stopOpacity=".30736"/>
                <stop offset="1" stopColor="#00ff85" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="d" x1="50%" x2="50%" y1="100%" y2="0%">
                <stop offset="0" stopColor="#a189f2"/>
                <stop offset="1" stopColor="#3f00f5"/>
            </linearGradient>
            <linearGradient id="e" x1="50%" x2="50%" y1="0%" y2="100%">
                <stop offset="0" stopColor="#bbadfa"/>
                <stop offset="1" stopColor="#9275f4"/>
            </linearGradient>
            <g fill="none">
                <g transform="translate(1 1)">
                    <path d="m11.9943899 27.9858314-11.9943899-6.9992916v-13.98724823l12.0617111 7.02196133z"
                          fill="url(#a)"/>
                    <path d="m23.9775596 20.9808724-23.9775596-13.98158083 11.9943899-6.99929157 24.0056101 13.9815808z"
                          fill="url(#b)" stroke="url(#c)"/>
                </g>
                <g transform="translate(1 29.014169)">
                    <path d="m11.9943899 27.9858314-11.9943899-6.9936241v-13.99291573l11.9663394 6.99362413z"
                          fill="url(#d)"/>
                    <path d="m11.9663394 13.9929157-11.9663394-6.99362413 11.9943899-6.99929157 11.9943899 6.99929157z"
                          fill="url(#e)"/>
                </g>
            </g>
        </svg>
    )
}
