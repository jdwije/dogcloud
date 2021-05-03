import * as React from "react";
import { useState } from "react";
import { readFileFromEvent, uploadFileToS3 } from "./";
import "./Drop.css";

export type DropProps = {
  apiEndpoint: string;
};

export const Drop = (props: DropProps) => {
  const [message, setMessage] = useState(undefined);
  const [file, setFile] = useState(undefined);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [lastCompleted, setLastCompleted] = useState([]);
  const [errors, setErrors] = useState([]);
  const { apiEndpoint } = props;
  const handleSetMessage = (e) => {
    const v = e.target.value;
  };

  const handleSetFile = (e) => {
    setErrors([]);
    setUploadProgress(0);
    setFile(readFileFromEvent(e));
  };
  const handleSubmit = async () => {
    if (!file && !message) {
      return; // XXX: shoul display notice
    }
    setIsUploading(true);

    // generate a UUID for this message.
    const uuid = "";

    const onUpdate = (pct) => {
      setUploadProgress(pct);
    };

    const r = await uploadFileToS3(apiEndpoint, file, onUpdate).catch((err) => {
      setErrors([err.message]);
    });

    if (r && r.status === 200) {
      setErrors([]);
      setLastCompleted([...lastCompleted, file]);
      setFile(undefined);
    }

    setUploadProgress(0);
    setIsUploading(false);
  };

  return (
    <div className="drop-content">
      <p>Securly drop me a message or a file</p>
      <textarea disabled={isUploading} onChange={handleSetMessage}></textarea>
      <input disabled={isUploading} type="file" onChange={handleSetFile} />
      <button disabled={isUploading} onClick={handleSubmit}>
        {isUploading ? `progress: ${uploadProgress} %` : "submit"}
      </button>
    </div>
  );
};
