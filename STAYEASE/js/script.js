const API_URL = "https://demohotelsapi.pythonanywhere.com/hotels/";

const hotelContainer = document.getElementById("hotelContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

let hotels = [];

// Fetch hotels
async function fetchHotels() {
    hotelContainer.innerHTML = `
        <div class="loader">Loading Hotels...</div>
    `;

    try {
        const response = await fetch(API_URL);
        const result = await response.json();

        hotels = result.data || [];

        displayHotels(hotels);

    } catch (error) {

        hotelContainer.innerHTML = `
            <div class="error">
                Failed to load hotels.
            </div>
        `;

        console.error(error);
    }
    
}

// Display hotels
function displayHotels(list) {

    hotelContainer.innerHTML = "";

    if (list.length === 0) {

        hotelContainer.innerHTML = `
            <div class="error">
                No hotels found.
            </div>
        `;

        return;
    }

    list.forEach(hotel => {

        hotelContainer.innerHTML += `

        <div class="hotel-card">

            <img src="${hotel.thumbnail}" alt="${hotel.name}">

            <div class="hotel-content">

                <h3>${hotel.name}</h3>

                <p class="location">
                    📍 ${hotel.location}
                </p>

                <p class="rating">
                    ⭐ ${hotel.rating}
                </p>

                <p class="price">
                    ₹${Number(hotel.price).toLocaleString()}
                </p>

                <div class="hotel-buttons">

                    <button
                        class="btn details-btn"
                        onclick="viewHotel(${hotel.id})">

                        View Details

                    </button>

                    <button
                        class="btn fav-btn"
                        onclick="addFavorite(${hotel.id})">

                        ❤ Favorite

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}
// Search hotels
function searchHotels() {

    const keyword = searchInput.value.trim().toLowerCase();

    const filteredHotels = hotels.filter(hotel =>
        hotel.name.toLowerCase().includes(keyword)
    );

    displayHotels(filteredHotels);
}

// Add to favorites
function addFavorite(id) {

    const hotel = hotels.find(item => item.id === id);

    if (!hotel) return;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.some(item => item.id === id)) {
        alert("Hotel already added to favorites!");
        return;
    }

    favorites.push(hotel);

    localStorage.setItem("favorites", JSON.stringify(favorites));

    alert("Added to Favorites ❤️");
}

// View hotel details
function viewHotel(id) {
    localStorage.setItem("selectedHotel", id);
    window.location.href = "hotel.html";
}

// Event listeners
if (searchBtn) {
    searchBtn.addEventListener("click", searchHotels);
}

if (searchInput) {
    searchInput.addEventListener("keyup", searchHotels);
}

// Start the app
fetchHotels();