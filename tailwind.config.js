module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        "nunito":["Nunito"],
        "pacifico":["Pacifico"],
        "prompt":["Prompt"]
      },
      colors:{
        "red-lighter":"#E74749",
        "red-1":"#E5383B",
        "red-2":"#BA181B",
        "red-3":"#A4161A",
        "red-4":"#660708",
        "gray-1":"#F5F3F4",
        "gray-2":"#D3D3D3",
        "gray-3":"#B1A7A6",
        "stroke":"#505050",
        "stroke-darker":"#2B2B2B",
        "black-1":"#161A1D",
        "black-2":"#0B090A",
        "white-1":"#FBFBFE",
        "white-2":"#fafafc",
        "white-3":"#c9c9c9",
        "gold":"#FDBC5A",
        "icon":"#848484",
        "green-1":"#008E1F",
        "green-2":"#00A925",
        "green-3":"#03BF2D"

      },
      boxShadow:{
        "special-inner":"rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
        "stack":"rgb(38, 57, 77) 0px 20px 30px -10px"
      },
      height: {
        "backdrop-1":"420px",
        "backdrop-2":"300px",
        "90%":"90%",
        "scroll":"34rem",
        "searchmodal":"32rem"
      },
      minHeight:{
        "200":"200px",
        "90%":"90%"
      },
      maxHeight:{
        "scroll":"35rem"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
