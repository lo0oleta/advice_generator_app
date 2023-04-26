import { ChakraProvider, chakra } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import {  Manrope } from "next/font/google";
import theme from "../../theme";

const manrope = Manrope({
  weight: ["400", "800"],
  subsets: ["latin"],
  variable: "--font-barlow",
});



export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <div className={manrope.variable}>
        <main className={manrope.variable}>
          <Component {...pageProps} />
        </main>
      </div>
    </ChakraProvider>
  );
}
