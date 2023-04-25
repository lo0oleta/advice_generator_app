import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Manrope, sans-serif",
    body: "Manrope, sans-serif",
  },

  colors: {
    brand: {
      bg:"hsl(218, 23%, 16%)",
      header: "hsl(150, 100%, 66%)",
      card:"hsl(217, 19%, 24%)",
      text:"hsl(193, 38%, 86%)",
    },
  },
});

export default theme;


// - Mobile: 375px
// - Desktop: 1440px

// ## Colors

// ### Primary

// - Light Cyan: hsl(193, 38%, 86%)
// - Neon Green: hsl(150, 100%, 66%)

// ### Neutral

// - Grayish Blue: hsl(217, 19%, 38%)
// - Dark Grayish Blue: hsl(217, 19%, 24%)
// - Dark Blue: hsl(218, 23%, 16%)
