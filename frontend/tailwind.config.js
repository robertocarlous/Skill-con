/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
     fontFamily: {
        switzer: ['Switzer', 'sans-serif'],
      },
       clipPath: {
        'custom': 'polygon(0 0, 50% 10%, 100% 0, 100% 100%, 0 100%)',
      },
  },
  plugins: [
    require('tailwind-clip-path'),
  ]
}

