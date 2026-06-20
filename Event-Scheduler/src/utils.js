export const formatTime = (time) => {
  if (!time) return "";
  const [hour, minute] = time.split(":");
  const date = new Date();
  date.setHours(hour, minute);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const getImageUrl = (image) => {
  if (!image) return "";
  const cleanImage = image.replaceAll('"', "");
  if (cleanImage.startsWith("http")) return cleanImage;
  return `https://eventify-ai-e28l.onrender.com${cleanImage}`;
};

export const formatPrice = (price) => {
  if (!price) return "Free";
  if (price.toLowerCase() === "free") return "Free";
  if (price.startsWith("$")) return price;
  return `$${price}`;
};
