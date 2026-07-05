const API_URL = "https://demohotelsapi.pythonanywhere.com/hotels/";
const hotelDetails = document.getElementById("hotelDetails");

const selectedId = localStorage.getItem("selectedHotel");

async function loadHotel() {

    hotelDetails.innerHTML = `
        <div class="loader">Loading Hotel...</div>
    `;

    try {

        const response = await fetch(API_URL);
        const result = await response.json();

        const hotels = result.data || [];

        const hotel = hotels.find(item => item.id == selectedId);

        if (!hotel) {

            hotelDetails.innerHTML = `
                <div class="error">
                    Hotel not found.
                </div>
            `;

            return;
        }

        let gallery = "";

        if (hotel.photos && hotel.photos.length) {

            hotel.photos.forEach(photo => {

                gallery += `
                    <img src="${photo}" alt="${hotel.name}">
                `;

            });

        } else {

            gallery = `
                <img src="${hotel.thumbnail}" alt="${hotel.name}">
            `;

        }

        hotelDetails.innerHTML = `

            <div class="hotel-card">

                <img src="${hotel.thumbnail}" alt="${hotel.name}">

                <div class="hotel-content">

                    <h2>${hotel.name}</h2>

                    <p class="location">
                        📍 ${hotel.location}
                    </p>

                    <p class="rating">
                        ⭐ ${hotel.rating}
                    </p>

                    <p class="price">
                        ₹${Number(hotel.price).toLocaleString()}
                    </p>

                    <p style="margin:20px 0;line-height:1.7;">
                        ${hotel.description}
                    </p>

                    <h3 style="margin-bottom:15px;">
                        Gallery
                    </h3>

                    <div style="
                        display:grid;
                        grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
                        gap:15px;
                        margin-bottom:20px;
                    ">

                        ${gallery}

                    </div>

                    <button
                        class="btn details-btn"
                        onclick="addFavorite()">

                        ❤️ Add to Favorites

                    </button>

                </div>

            </div>

        `;

        window.currentHotel = hotel;

    } catch (error) {

        hotelDetails.innerHTML = `
            <div class="error">
                Failed to load hotel.
            </div>
        `;

        console.error(error);
    }
}

function addFavorite() {

    if (!window.currentHotel) return;

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    const exists = favorites.some(
        item => item.id === window.currentHotel.id
    );

    if (exists) {

        alert("Already in favorites!");

        return;
    }

    favorites.push(window.currentHotel);

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    alert("Added to Favorites ❤️");
}

loadHotel();