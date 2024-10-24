export const getLocation = () => {
  if (navigator.geolocation) {
    // Request the current position of the device
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};

const showPosition = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  return { latitude, longitude };
};

const showError = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
};
