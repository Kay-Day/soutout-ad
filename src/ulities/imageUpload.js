export const checkImage = (file) => {
  let err = "";
  if (!file) return (err = "File does not exist.");

  if (file.size > 1024 * 1024)
    // 1mb
    err = "The largest image size is 1mb.";

  if (file.type !== "image/jpeg" && file.type !== "image/png")
    err = "Image format is incorrect.";

  return err;
};

export const imageUpload = async (image) => {
  let imgArr = [];
  const formData = new FormData();

  formData.append("file", image);
  formData.append("upload_preset", "ncpanat5");
  formData.append("cloud_name", "khanhbatluc");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/khanhbatluc/auto/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.secure_url;
};

export const imageShow = (src) => {
  return (
    <img
      src={src}
      alt="images"
      style={{ height: "150px", width: "150px", objectFit: "cover" }}
      className="img-thumbnail"
    />
  );
};

export const monthNames = (months) => {
  return months.map((month) => {
    const date = new Date(Date.UTC(2000, month - 1, 1));
    return date.toLocaleString('en-US', { month: 'long' });
  });
}

// console.log(monthNames); // Output: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
