// const plugin = require('tailwindcss/plugin')

module.exports = {
  theme: {
    extend: {
      colors: {
        "olive-dark": "#010101",
        "olive": "#425951",
        "olive-light": "#8EB6AD",
        "olive-semi-light": "#579F93",
        "yellow-green": '#DEECB9'
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
  //       "backgroundImage": {
  //         backgroundImage: 'Poppins-Regular',
  //       },
  //     });
  //   }),
  // ],
}