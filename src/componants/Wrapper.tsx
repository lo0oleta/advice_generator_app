import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  VStack,
  Progress,
  Spinner,
  Button,
  Input,
} from "@chakra-ui/react";
import Image from "next/image";
import DividerDesktop from "./icon/DesktopDividerIcon";
import Dice from "./icon/DiceIcon";
import { ErrorMessage, Field, Form, Formik } from "formik";

const Wrapper = () => {
  const [touched, setTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [className, setClassName] = useState("");
  const [nextFetch, setNextFetch] = useState(1);
  const [loadedData, setLoadedData] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [major, setMajor] = useState("");

  const [error, setError] = useState(null);

  useEffect(() => {
    if (prompt) {
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
    }
  }, [nextFetch, prompt]);

  return (
    <VStack
      spacing={8}
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
      <Flex color="brand.header" marginStart={5} marginEnd={5}>
        <Text fontSize={25} noOfLines={2} textAlign="center" maxW="100%">
          Please feel free to indicate your desired major in the input box
          provided
        </Text>
      </Flex>

      <Formik
        initialValues={{ major: "" }}
        onSubmit={(values, actions) => {
          if (!values.major) {
            setMajor(values.major);
            console.log(major);
          }
          setPrompt(
            `Please generate a tech startup idea for the field of ${values.major} that addresses current challenges and opportunities, while also taking into consideration the latest trends, innovations, and consumer demands in one sentence.`
          );
          actions.setSubmitting(false);
        }}
      >
        <Form>
          <Field
            as={Input}
            type="text"
            name="major"
            required
            bg="white"
            color="black"
            border="1px solid #CBD5E0"
            borderRadius="10px"
            p={2}
            _focus={{ outline: "none", boxShadow: "none" }}
          />{" "}
          <ErrorMessage name="major" component="div" />
          <Button
            type="submit"
            className={className}
            position="absolute"
            bottom="-22.5px"
            left="calc(50% - 22.5px)"
            bg="brand.header"
            borderRadius="50%"
            w="55px"
            h="55px"
            justifyContent={"center"}
            alignItems="center"
            _hover={{ shadow: "0px 0px 20px 10px " }}
          >
            {" "}
            {isLoading ? <Spinner /> : <Dice />}
          </Button>
        </Form>
      </Formik>
      <Flex color="brand.header"></Flex>
      <Text
        fontSize={["20px", "24px", "28px"]}
        maxW="95%"
        textAlign="center"
        pb="6%"
      >
        {`"${loadedData ? loadedData : "Your Advice will appear here ..."}"`}
      </Text>
    </VStack>
  );
};

export default Wrapper;
