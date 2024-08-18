// Initialize an empty array to store ads data
let adsList = [];

// Flag to indicate whether data is currently being loaded
let isLoading = true;

// Function to fetch ads data from the server
async function fetchAds() {
  const response = await fetch("/ads/all");

  // Redirect to login page if user is unauthorized
  if(response.status === 401) {
    window.location.href = "/users/login";
    return;
  }

  // Handle non-successful responses
  if (response.status != 200) {
    console.error(response.body);
    return;
  }

  // Parse the JSON response
  const ads = await response.json();

  // Update adsList with fetched ads data
  adsList = ads;

  return ads;
}

// Function to approve an ad by its ID
async function approveAd(id) {
  const response = await fetch(`/ads/${id}/approve`);

  // Redirect to login page if user is unauthorized
  if(response.status === 401) {
    window.location.href = "/users/login";
    return;
  }

  // Handle non-successful responses
  if (response.status != 200) {
    console.error(response.body);
    return;
  }

  // Parse the JSON response
  const ad = await response.json();

  // Re-render the ads list after approval
  renderAds();

  return ad;
}

// Function to delete an ad by its ID
async function deleteAd(id) {
  const response = await fetch(`/ads/${id}/delete`, {
    method: "DELETE"
  });

  // Redirect to login page if user is unauthorized
  if(response.status === 401) {
    window.location.href = "/users/login";
    return;
  }

  // Handle non-successful responses
  if (response.status != 204) {
    console.error(response.body);
    return;
  }

  // Re-render the ads list after deletion
  renderAds();
}

// Function to filter ads based on search key
function searchAds(ads, searchKey = "") {
  const filteredAds = ads.filter((ad) => {
    return (
        ad.title.toLowerCase().includes(searchKey.toLowerCase()) ||
        ad.description.toLowerCase().includes(searchKey.toLowerCase())
    );
  });

  return filteredAds;
}

// Function to render ads on the webpage
async function renderAds() {
  // Fetch ads data
  const ads = await fetchAds();

  // Update isLoading flag
  isLoading = false;

  // Return if no ads data fetched
  if (!ads) {
    return;
  }

  // Filter ads based on search input
  const filteredAds = searchAds(ads, document.getElementById("search").value);

  // Get the ads container element
  const adsContainer = document.getElementById("ads-list");

  // Clear the ads container
  adsContainer.innerHTML = "";

  // Iterate through filtered ads and render them
  filteredAds.forEach((ad) => {
    const adElement = document.createElement("li");
    adElement.classList.add("ad", "card", "mb-4", "shadow-sm");

    adElement.innerHTML = `
    <div class="card-body">
            <h2 class="card-title">${ad.title}</h2>
            <p class="card-text">${ad.description}</p>
            <p class="card-text">${ad.price}</p>
            <p class="card-text">${ad.email}</p>
            <p class="card-text">${ad.phone}</p>
            <p class="card-text">approved: ${ad.isApproved}</p>
            ${
        !ad.isApproved
            ? ` <button class="btn btn-primary approve" data-id="${ad.id}" onclick="approveAd(${ad.id})" >Approve</button>`
            : ``
    }
            <button class="btn btn-danger delete" data-id="${
        ad.id
    }" onclick="deleteAd(${ad.id})">Delete</button>
        </div>
    `;

    adsContainer.appendChild(adElement);
  });
}

// Event listener for search input changes
document.getElementById("search").addEventListener("input", () => {
  renderAds();
});

// Initial rendering of ads when the page loads
renderAds();
