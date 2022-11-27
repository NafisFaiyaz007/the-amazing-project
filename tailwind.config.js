// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}",],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors:{
        primary:'#EE9789',
        secondary:'#EDE4E0'
      }
      
    },
    fontFamily:{
      sans:['Montserrat', 'sans-serif'],
        
      }
  },
  plugins: [],
}
