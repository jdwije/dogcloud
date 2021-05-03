import * as React from "react";
import { useState } from "react";
import { File } from "css.gg";
import { isUri } from "valid-url";
import { unfurl } from "unfurl.js";
import { readFileFromEvent, uploadFileToS3 } from "./";
import "./Post.css";

import { convertBytesToMb } from "./convertBytesToMb";

export type PostProps = {
  apiEndpoint: string;
  notify: (messages: string[], severity: string) => void;
};

export const Post = (props: PostProps) => {
  const [message, setMessage] = useState(undefined);
  const [file, setFile] = useState(undefined);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { apiEndpoint } = props;
  const handleSetMessage = async (e) => {
    const v = `${e.target.value}`.trim();

    // it is url content, unfurl
    if (isUri(v)) {
      const data = await unfurl(v);
      console.log(data);
    }
    // it is text content
    else {
    }
  };

  const handleSetFile = (e) => {
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
      props.notify(err.message, "error");
    });

    if (r && r.status === 200) {
      setFile(undefined);
    }

    setUploadProgress(0);
    setIsUploading(false);
  };

  return (
    <div className="post-content">
      <h3>Content</h3>
      <p>Post a link, message, or a file then press submit</p>
      <textarea
        name="post"
        id="post-text"
        disabled={isUploading}
        onChange={handleSetMessage}
      ></textarea>
      <div className="post-attachment">
        {file && (
          <div className="attachment-line">
            <File />
            <span>{convertBytesToMb(file.size)} mb</span>
            <span>{file.name}</span>
          </div>
        )}
      </div>
      <div className="post-control">
        <div className="file-upload">
          <label for="file-select" className="button">
            Attach File
          </label>
          <input
            style={{ visibility: "hidden" }}
            id="file-select"
            disabled={isUploading}
            type="file"
            onChange={handleSetFile}
          />
        </div>
        <button disabled={isUploading} onClick={handleSubmit}>
          {isUploading ? `Progress: ${uploadProgress} %` : "Submit"}
        </button>
      </div>
    </div>
  );
};
