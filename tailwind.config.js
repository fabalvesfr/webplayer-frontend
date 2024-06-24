/** @type {import('tailwindcss').Config} */

import { nextui } from "@nextui-org/react";
// import tailwindForms from "@tailwindcss/forms"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
      },
      fontSize : {
        '2xl': '1.6rem',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        'rubik-glitch': ['"Rubik Glitch"', 'cursive'],
      },
      colors: {
        "yellow-tagna":"#EADB2B"
      },
      backgroud: {
        'logo-tempus': "url('/logo-tempus.png')"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui(), require('@tailwindcss/forms')],
}

