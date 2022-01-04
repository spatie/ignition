module.exports = {
    content: [
        './resources/js/**/*.{js,jsx,ts,tsx}',
        './resources/views/**/*.blade.php',
        '../ignition-ui/src/**/*.{js,jsx,ts,tsx}', // local development in npm workspace
        './node_modules/@flareapp/ignition-ui/src/**/*.{js,jsx,ts,tsx}',
    ],
    darkMode: 'class', // or 'media' or 'class'
    // important: true,
    theme: {
        extend: {
            zIndex: {
                1 : 1,
            },
            height: {
                'screen-1/2' : '50vh',
            },
            minWidth: {
                10: '2.5rem'
            },
            gridTemplateColumns: {
                'auto-1fr': 'auto 1fr'
            },
            screens: {
                '2xl': '1920px',
            },
            transitionProperty: {
                'nav': 'transform, box-shadow'
            }
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
    ],
};
