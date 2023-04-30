import React, { useState, useEffect } from "react";
import { Flex, Text, VStack, Progress, Spinner } from "@chakra-ui/react";
import Image from "next/image";
import DividerDesktop from "./icon/DesktopDividerIcon";
import Dice from "./icon/DiceIcon";

const Wrapper = () => {
  const [touched, setTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [className, setClassName] = useState("");
  const [nextFetch, setNextFetch] = useState(1);
  const [loadedData, setLoadedData] = useState(null);
  const [prompt, setPrompt] = useState(
    "Please generate a tech startup idea that addresses current challenges and opportunities, while also taking into consideration the latest trends, innovations, and consumer demands in one sentence."
  );

  const [error, setError] = useState(null);
  const listState = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setClassName("rotate");
    fetch("/api/advice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: prompt }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) =>
        setTimeout(() => {
          setLoadedData(data.result.choices[0].text);
          setIsLoading(false); // Set loading to false when request completes
        }, 3000)
      )
      .catch((error) => setError(error));

    setTouched(true);
    setTimeout(() => {
      setClassName("");
      setTouched(false);
    }, 4000);
  }, [nextFetch]);

  return (
    <VStack
      position="relative"
      justifyContent="center"
      alignItems="center"
      bg="brand.card"
      w="80%"
      maxW="550px"
      h="fit-content"
      minH="300px"
      borderRadius="15px"
    >
      <Flex color="brand.header">
        <Text>ADVICE #</Text>
        {/* <Text textAlign="center">{loadedDataId}</Text> */}
      </Flex>
      <Text
        fontSize={["20px", "24px", "28px"]}
        maxW="95%"
        textAlign="center"
        pb="6%"
      >
        {`"${loadedData ? loadedData : "Loading..."}"`}
      </Text>
      <Flex position={"absolute"} maxW="80%" bottom="15%" pb="3%">
        {/* <DividerDesktop /> */}
      </Flex>
      <Flex
        onClick={() => {
          if (!touched) setNextFetch((prev) => prev + 1);
        }}
        className={className}
        position="absolute"
        bottom="-22.5px"
        left="calc(50% - 22.5px)"
        bg="brand.header"
        borderRadius="50%"
        w="45px"
        h="45px"
        justifyContent={"center"}
        alignItems="center"
        _hover={{ shadow: "0px 0px 20px 10px " }}
      >
          {isLoading? <Spinner/> :<Dice />}
      </Flex>
    </VStack>
  );
};

export default Wrapper;
