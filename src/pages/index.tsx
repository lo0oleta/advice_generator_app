import Head from "next/head";
import { Box, Flex } from "@chakra-ui/react";
import Wrapper from "@/componants/Wrapper";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Advice Generator</title>
        <meta name="description" content="Advice Generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        w="100vw"
        h="100vh"
        bg="brand.bg"
        justifyContent="center"
        alignItems="center"
        color="white"
      >
        <Wrapper />
      </Flex>
    </div>
  );
}
