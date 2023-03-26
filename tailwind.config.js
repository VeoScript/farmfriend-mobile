// const plugin = require('tailwindcss/plugin')

module.exports = {
  theme: {
    extend: {
      colors: {
        "olive-dark": "#010101",
        "olive": "#425951",
        "olive-light": "#F3FADB",
        "olive-leaf": "#DEECB9"
      },
      fontFamily: {
        "poppins": ['Poppins-Regular'],
        "poppins-light": ["Poppins-Light"],
        "poppins-bold": ["Poppins-Bold"],
        "poppins-black": ["Poppins-Black"]
      }
    }
  },
  // plugins: [
  //   plugin(({ addUtilities }) => {
  //     addUtilities({
  //       "paragraph": {
  //         fontFamily: 'Poppins-Regular',
  //       },
  //     });
  //   }),
  // ],
}