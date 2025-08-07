import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
              poppins: ['Poppins', 'sans-serif'],
              libre: ['"Libre Baskerville"', 'serif'],
            },
         colors: {
        'custom-teal': '#003333', // Define tu color personalizado aquí
        },
    },
  },
  plugins: [nextui()],
  darkMode:"class"
}
