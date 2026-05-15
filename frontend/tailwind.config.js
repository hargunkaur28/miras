import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                serif: ['"Cormorant Garamond"', ...defaultTheme.fontFamily.serif],
            },
            colors: {
                primary: {
                    DEFAULT: '#F9F9F9',
                    foreground: '#000000',
                },
                secondary: {
                    DEFAULT: '#000000',
                    foreground: '#F9F9F9',
                },
            },
            borderRadius: {
                '3xl': '1.5rem',
                '4xl': '2rem',
            },
        },
    },

    plugins: [forms],
};
