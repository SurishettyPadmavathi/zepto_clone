function fetchLocation() {
  let locationElement = document.getElementById("location");
  if (!locationElement) return;

  let savedLocation = localStorage.getItem("userLocation");
  if (savedLocation) {
    locationElement.innerHTML = savedLocation;
    return;
  }

  locationElement.innerHTML = "Fetching Location...";

  if (!navigator.geolocation) {
    locationElement.innerHTML = "Location not supported";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      try {
        let response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        let data = await response.json();

        let address =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.state ||
          "Unknown";

        localStorage.setItem("userLocation", address);
        locationElement.innerHTML = address;
      } catch (err) {
        locationElement.innerHTML = "Location unavailable";
      }
    },
    () => {
      locationElement.innerHTML = "Permission Denied";
    }
  );
}

fetchLocation();