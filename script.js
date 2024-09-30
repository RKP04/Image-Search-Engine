const accessKey = "7uNnkUYMqT7yio2Df5TkWLJCz9f9yqS_qQZ6Qy1o44E";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

if(page==1)
{
searchResult.innerHTML = "";
}
async function searchImages() {
    keyword = searchBox.value.trim();

    if (keyword === "") {
        alert("Please enter a search term.");
        return;
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (page === 1) {
            searchResult.innerHTML = "";  // Clear previous results for new search
        }

        const results = data.results;

        if (results.length === 0) {
            searchResult.innerHTML = "<p>No results found. Try another search.</p>";
            showMoreBtn.style.display = "none";  // Hide 'Show More' if no results
            return;
        }

        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });

        // Display the "Show More" button only if there are more pages
        if (data.total_pages > page) {
            showMoreBtn.style.display = "block";
        } else {
            showMoreBtn.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching images:", error);
        showMoreBtn.style.display = "none";  // Hide button if there's an error
    }
}

// Event listener for form submission
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;  // Reset page to 1 for a new search
    searchImages();
});

// Event listener for "Show More" button
showMoreBtn.addEventListener("click", () => {
    page++;  // Increment page for next set of results
    searchImages();
});
