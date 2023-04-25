import React, { useState, useEffect } from "react";
import { Flex, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import DividerDesktop from "./icon/DesktopDividerIcon";
import Dice from "./icon/DiceIcon";

const Wrapper = () => {
  const [touched, setTouched] = useState(false);
  const [className, setClassName] = useState("");
  const [nextFetch, setNextFetch] = useState(1);
  const [loadedDataId, setLoadedDataId] = useState(null);
  const [loadedData, setLoadedData] = useState(null);

  const [error, setError] = useState(null);
  const listState = useState([]);

  useEffect(() => {
    setClassName("rotate");
    fetch("https://api.adviceslip.com/advice")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) =>
        setTimeout(() => {
          setLoadedData(data.slip.advice);
          setLoadedDataId(data.slip.id);
          console.log(loadedData);
          console.log(loadedDataId);
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
        <Text textAlign="center">{loadedDataId}</Text>
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
        <DividerDesktop />
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
        <Dice />
      </Flex>
    </VStack>
  );
};

export default Wrapper;