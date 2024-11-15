/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        customRed: '#c80815',
        customBlue: '#0000ff',
        customZinc: '#f5f4f4',
      },
      backgroundImage: {
        about:
          'linear-gradient(300deg, rgb(245, 245, 245) 20%, rgb(0, 26, 67, 0.1) 40%, rgb(0, 26, 67, 0.2) 20%, rgb(245, 245, 245) 75%, rgb(245, 245, 245) 100%)',
      },
      fontFamily: {
        // Add your custom font here
        'playwrite-NL': ['"Playwrite NL"', 'cursive'],
        sans: ['Raleway', 'sans-serif'],
        EDU: ['Edu AU VIC WA NT Pre', 'cursive'],
      },
    },
  },
  plugins: [],
};
