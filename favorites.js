const favoriteContainer = document.getElementById("favoriteContainer");

function loadFavorites() {

    const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length === 0) {

        favoriteContainer.innerHTML = `
            <div class="error">
                <h2>No Favorite Hotels Yet ❤️</h2>
                <p>Add hotels from the homepage to see them here.</p>
            </div>
        `;

        return;
    }

    favoriteContainer.innerHTML = "";

    favorites.forEach(hotel => {

        favoriteContainer.innerHTML += `

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
                        onclick="removeFavorite(${hotel.id})">

                        Remove

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

function removeFavorite(id) {

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    favorites = favorites.filter(hotel => hotel.id !== id);

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    loadFavorites();
}

function viewHotel(id) {

    localStorage.setItem("selectedHotel", id);

    window.location.href = "hotel.html";
}

loadFavorites();