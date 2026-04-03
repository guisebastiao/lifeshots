export const base64ToFile = (base64: string): File => {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
  const bstr = atob(arr[1]);
  const len = bstr.length;
  const u8arr = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }

  return new File([u8arr], "image.png", { type: mime });
};
