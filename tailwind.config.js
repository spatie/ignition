module.exports = {
    content: [
        './resources/js/**/*.{js,jsx,ts,tsx}',
        './resources/views/**/*.php',
        '../ignition-ui/src/**/*.{js,jsx,ts,tsx}', // local development in npm workspace
        './node_modules/@flareapp/ignition-ui/src/**/*.{js,jsx,ts,tsx}',
    ],
    darkMode: 'class', // or 'media' or 'class'
    // important: true,
    theme: {
        extend: {
            colors: {
                'gray': {
                    25: 'rgb(252, 252, 253)',
                }
            },
            gridTemplateColumns: {
                'auto-1fr': 'auto 1fr'
            },
            screens: {
                '2xl': '1920px',
            },
            transitionProperty: {
                'animation': 'transform, box-shadow, opacity'
            },
            backgroundImage: {
                'dots-darker': 'url("data:image/svg+xml,%3Csvg width=\'30\' height=\'30\' viewBox=\'0 0 30 30\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z\' fill=\'rgba(0,0,0,0.07)\'/%3E%3C/svg%3E")',
                'dots-lighter': 'url("data:image/svg+xml,%3Csvg width=\'30\' height=\'30\' viewBox=\'0 0 30 30\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z\' fill=\'rgba(255,255,255,0.07)\'/%3E%3C/svg%3E")'
            }
        },
    },
    plugins: [
        require('@tailwindcss/container-queries'),
    ],
};
