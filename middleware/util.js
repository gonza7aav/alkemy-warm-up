const axios = require('axios').default;

// This return null if the argument doesn't exist a.k.a. undefined
const valueOrNull = (x) => (typeof x === 'undefined' ? null : x);

const checkImageURL = async (url) => {
  const IMAGE_FILE_EXTENSIONS = [
    'apng',
    'avif',
    'gif',
    'jpg',
    'jpeg',
    'jfif',
    'pjped',
    'pjp',
    'png',
    'svg',
    'webp',
    'bmp',
    'ico',
    'cur',
    'tif',
    'tiff',
  ];

  // Get the extension of the resource slicing from the last dot (if it exists)
  const urlExtension = url.slice(url.lastIndexOf('.') + 1);

  // If the extensions isn't inside the array of extensions,
  // then the image is not supported
  if (!IMAGE_FILE_EXTENSIONS.includes(urlExtension)) {
    return {
      success: false,
      statusToSend: 400,
      messageToSend: "The image type isn't supported",
    };
  }

  try {
    const request = await axios.get(url);

    // If the request wasn't OK, or it didn't return data, then return an error
    if (
      request.status !== 200 ||
      typeof request === 'undefined' ||
      typeof request.data === 'undefined'
    ) {
      return {
        success: false,
        statusToSend: 404,
        messageToSend: "The image wasn't found",
      };
    }
  } catch (error) {
    return {
      success: false,
      statusToSend: 404,
      messageToSend: "The image wasn't found",
    };
  }

  return { success: true };
};

module.exports = { valueOrNull, checkImageURL };
