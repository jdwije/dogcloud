import { getSignedUrl } from './getSignedUrl'
import readBlob from "read-blob";
import * as blobUtil from "blob-util";

export const uploadFileToS3 = async (apiEndpoint, file, onUpdate): Promise<XMLHttpRequest> => {
  const urlData = await getSignedUrl(apiEndpoint, file)
  const blob = blobUtil.dataURLToBlob(await readBlob(file, "dataurl"));

  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();

    request.open("PUT", urlData.uploadUri);
    request.setRequestHeader("Origin", "locahost");
    request.setRequestHeader("Referrer-Policy", "no-referrer");

    request.upload.addEventListener("progress", (e) => {
      const pct = ((e.loaded / e.total) * 100).toFixed(2);

      if (onUpdate) {
        onUpdate(pct);
      }
    });

    // request finished event
    request.addEventListener("load", function() {
      resolve(request);
    });

    request.addEventListener("error", function(e) {
      reject(new Error(`Request failed with status: ${request.status}`));
    });


    request.send(blob);
  });
};
