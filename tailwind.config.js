export default {
  content: ["./index.html", "./src/**/*.{jsx, .svg}"],
  theme: {
    extend: {
      gridTemplateRows: {
        "3r": "auto 1fr auto",
      },
      colors: {
        text: {
          lighter: "#ffffff",
          light: "#f1f1f1",
          dark: "#0f0f0f",
          darker: "black",
        },
        accent: {
          light: "#ff3f3f",
          // DEFAULT: "#FF0000",
          DEFAULT: "red",
        },
        bg: {
          gray: "#ffffff",
          light: "white",
          dark: "#121212",
          darker: "black",
        },
      },
      borderRadius: {
        DEFAULT: "5px",
        lg: "10px",
        sm: "2px",
        circle: "999999px",
      },
      fontFamily: {
        primary: ["Circular Std", "sans-serif"],
        secondary: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
