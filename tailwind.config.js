/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
		 backgroundImage: {
        'splash': "url('./splash.png')",
			},
			gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
      },
  	},
		fontFamily: {
			'kaushan': 'Kaushan Script, cursive',
			'carattere': 'Carattere, cursive',
		},
	}
}
