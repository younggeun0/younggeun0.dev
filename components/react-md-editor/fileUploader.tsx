const fileUploader = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
    });

    const { filePath } = await response.json();
    return filePath;
};

export default fileUploader;
