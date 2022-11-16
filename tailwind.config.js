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
        '20': 'repeat(20, minmax(0, 1fr))',
      },
			gridTemplateRows: {
				'10': 'repeat(10, minmax(0, 1fr))',
			},
			gridRow: {
        'span-10': 'span 10 / span 10',
      }
  	},
		fontFamily: {
			'kaushan': 'Kaushan Script, cursive',
			'carattere': 'Carattere, cursive',
		},
	}
}
