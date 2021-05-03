export const readFileFromEvent = (e) => {
  const files = e.target.files || e.dataTransfer.files;
  const file = files.length > 0 ? files[0] : undefined;

  return file;
};
