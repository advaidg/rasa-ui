import React, { useState } from "react";
import Modal from "react-modal";
import {
    Input,
    Button
  } from '@chakra-ui/react'

Modal.setAppElement("#root"); 

function GithubInputDialog({ isOpen, onRequestClose, onSubmit, responseText }) {
    const [githubUrl, setGithubUrl] = useState("");
    const [branchName, setBranchName] = useState("");
    const [fileName, setFileName] = useState("");

    const handleUpload = async () => {
        if (githubUrl && fileName && branchName) {
    
          const blob = new Blob([responseText], { type: "text/plain" });
          const file = new File([blob], fileName);
          const formData = new FormData();
          formData.append("file", file);
          formData.append("fileName", fileName);
          formData.append("Branch", branchName);
          formData.append("githubUrl", githubUrl);
    
          try {
            const response = await fetch("http://127.0.0.1:5000/upload-file-to-github", {
              method: "POST",
              body: formData,
            });
    
            if (response.ok) {
              console.log("File uploaded successfully!");
            } else {
              console.error("Failed to upload file.");
            }
          } catch (error) {
            console.error("Error while uploading file:", error);
          }
        } else {
          alert("Please provide GitHub URL, branch name, file name, and select a file.");
        }
      };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="GitHub Input Dialog"
    >
      <h2>Enter GitHub URL and File Name</h2>
      <Input
        type="text"
        placeholder="GitHub URL"
        value={githubUrl}
        onChange={(e) => setGithubUrl(e.target.value)}
      />
            <Input
        type="text"
        placeholder="Branch Name"
        value={branchName}
        onChange={(e) => setBranchName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="File Name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      <Button colorScheme="blue" onClick={handleUpload}>
        Upload
      </Button>
    </Modal>
  );
}

export default GithubInputDialog;
