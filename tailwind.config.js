/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
		 backgroundImage: {
        'splash': "url('./splash.png')",
		}
  },
  plugins: []
}
}
