import "./AddProject.css";
import React, { useState } from "react";
import { storage, db } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

// Import Close Icon
import closeIcon from "../../assets/logos/close-icon.png";

interface AddProjectProps {
  setIsAddProjectOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddProject({ setIsAddProjectOpen }: AddProjectProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<number[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [projectWebsite, setProjectWebsite] = useState<string>("");

  const handleChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
      setProgress(new Array(selectedFiles.length).fill(0));
    }
  };

  const handleUpload = () => {
    if (files.length === 0 || !projectTitle || !projectDescription) return;

    const promises = files.map((file, index) => {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise<string>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const newProgress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress((prevProgress) => {
              const updatedProgress = [...prevProgress];
              updatedProgress[index] = newProgress;
              return updatedProgress;
            });
          },
          (error) => {
            console.error(error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setUrls((prevUrls) => [...prevUrls, downloadURL]);
              console.log(`File ${file.name} available at`, downloadURL); // Print the URL to the console
              resolve(downloadURL);
            });
          }
        );
      });
    });

    Promise.all(promises)
      .then((downloadURLs) => {
        console.log("All files uploaded:", downloadURLs);
        saveProjectInfo(downloadURLs);
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
      });
  };

  const saveProjectInfo = async (downloadURLs: string[]) => {
    try {
      await addDoc(collection(db, "projects"), {
        "project-title": projectTitle,
        "project-description": projectDescription,
        "project-image-link": downloadURLs,
        "project-website": projectWebsite,
      });
      console.log("Project info saved successfully");
    } catch (error) {
      console.error("Error saving project info:", error);
    }
  };

  return (
    <div className="addproject-container">
      <div className="addproject-box">
        <img
          className="addproject-close"
          src={closeIcon}
          alt="Click to Close"
          onClick={() => setIsAddProjectOpen(false)}
          draggable="false"
        />

        <input
          type="text"
          className="addproject-project-title-input"
          placeholder="Project Title"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
        />
        <textarea
          placeholder="Project Description"
          className="addproject-project-description-input"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />
        <input
          type="text"
          className="addproject-project-website-input"
          placeholder="Project Website"
          value={projectWebsite}
          onChange={(e) => setProjectWebsite(e.target.value)}
        />

        <input
          type="file"
          className="addproject-project-images-input"
          onChange={handleChangeFiles}
          multiple
        />
        <button onClick={handleUpload}>Upload</button>
        <div className="addproject-status-info">
          {progress.map((prog, index) => (
            <p key={index}>
              Upload progress for file {index + 1}: {prog}%
            </p>
          ))}
          {urls.length > 0 && (
            <div>
              <p>Files uploaded successfully!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddProject;
