/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'system-ui', 'sans-serif'],
        integral: ['"Integral CF"', 'system-ui', 'sans-serif'],
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        lg: '100px',
      },
    },
  },
  plugins: [],
}
