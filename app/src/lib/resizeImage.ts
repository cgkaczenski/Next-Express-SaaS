function resizeImage(file: File, MAX_WIDTH: number, MAX_HEIGHT: number) {
  const image = document.createElement("img");

  const resize = (resolve: (value: Blob | File) => void) => () => {
    let isResizeNeeded = false;
    let width = image.width;
    let height = image.height;

    if (width > height) {
      if (width > MAX_WIDTH) {
        isResizeNeeded = true;
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        isResizeNeeded = true;
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
    }

    if (isResizeNeeded) {
      const canvas = document.createElement("canvas");

      canvas.width = width;
      canvas.height = height;

      console.log(width, height);

      const ctx = canvas.getContext("2d");
      ctx!.drawImage(image, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, file.type);
    } else {
      resolve(file);
    }
  };

  return new Promise<Blob | File>((resolve) => {
    const reader = new FileReader();

    console.log(`before ${image.src}`);

    reader.readAsDataURL(file);

    reader.onload = (e) => {
      if (e && e.target && e.target.result) {
        image.src = e.target.result.toString();

        image.onload = resize(resolve);

        console.log(`after ${image.src}`);
      }
    };
  });
}

export { resizeImage };
