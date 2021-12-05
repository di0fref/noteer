// module.exports = {
//     purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
//     darkMode: false, // or 'media' or 'class'
//     theme: {
//         extend: {},
//     },
//     variants: {
//         extend: {},
//     },
//     plugins: [
//         // require('@themesberg/flowbite/plugin')
//         require('@tailwindcss/typography'),
//     ],
// }


module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    // theme: {
    //     extend: {
    //         typography: (theme) => ({
    //             DEFAULT: {
    //                 css: {
    //                     color: theme("var(--text-normal)"),
    //                 },
    //             },
    //         }),
    //     }
    // },
    plugins: [
        require('@tailwindcss/typography'),
    ],
    variants: {
        extend: {},
    },
}