import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Container,
  Flex,
  Heading,
  Input,
  Button,
  Text,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import axios from "axios";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import Modal from "react-modal";
import GithubInputDialog from "./GithubInputDialog"; 
import ChatWidget from "./ChatWidget";

Modal.setAppElement("#root"); 

function App() {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [isUploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [githubUrl, setGithubUrl] = useState("");
  const [fileName, setFileName] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://python-gpt.azurewebsites.net/generate-text", {
        user_input: inputText,
      });
      setResponseText(response.data.generated_text);
      setUploadDialogOpen(false); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUpload = () => {
    if (githubUrl && fileName) {
    
      console.log("GitHub URL:", githubUrl);
      console.log("File Name:", fileName);
      setUploadDialogOpen(false); 
    } else {
      alert("Please provide both a GitHub URL and a file name.");
    }
  };

  return (
    <Container maxW="xl">
      <ChatWidget></ChatWidget>
      <Box bg="blue.500" p={4} color="white">
        <Flex alignItems="center">
          <Heading as="h1" fontSize="2xl">
            Cloud Warriors
          </Heading>
          <Spacer />
          <Button colorScheme="red" size="sm">
            Logout
          </Button>
        </Flex>
      </Box>
      <Flex justify="center" mt={8}>
        <VStack spacing={4}>
          <Input
            type="text"
            placeholder="Enter text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Button colorScheme="blue" onClick={handleSubmit}>
            Submit
          </Button>
          <Box
            border="1px solid gray"
            p={4}
            borderRadius="md"
            bg="gray.100"
            minH="600px"
            minW="900px"
          >
            <Text fontWeight="bold">Response:</Text>
            <AceEditor
              mode="text"
              theme="github"
              name="response-editor"
              value={String(responseText)}
              readOnly={true}
              width="100%"
              height="500px"
              editorProps={{ $blockScrolling: Infinity }}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
              }}
            />
          </Box>
          <Button colorScheme="blue" onClick={() => setUploadDialogOpen(true)}>
            Next
          </Button>
        </VStack>
      </Flex>
      <GithubInputDialog
        isOpen={isUploadDialogOpen}
        onRequestClose={() => setUploadDialogOpen(false)}
        onUpload={handleUpload}
        githubUrl={githubUrl}
        fileName={fileName}
        setGithubUrl={setGithubUrl}
        setFileName={setFileName}
        responseText= {responseText}
      />
    </Container>
  );
}

function Main() {
  return (
    <ChakraProvider>
      <App />
    </ChakraProvider>
  );
}

export default Main;
