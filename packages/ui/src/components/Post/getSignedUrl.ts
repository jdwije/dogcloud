export const getSignedUrl = async (apiEndpoint: string, file: File) => {
  const getSignedUrl = await fetch(apiEndpoint, {
    method: "POST",
    body: JSON.stringify({
      contentType: file.type,
      key: file.name,
    }),
  });

  return getSignedUrl.json();
}
