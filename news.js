const apiKey = `a4d4df7915104de5828ad81ee245c0c3`;
const blogContainer = document.getElementById("container-card");
const search = document.getElementById("inputSearch");
const button = document.getElementById("buttonSearch");
const showMore = document.getElementById("showMore");
const home = document.querySelector(".btn1");
const sport = document.querySelector(".btn2");
const disasters = document.querySelector(".btn3");
const traffic = document.querySelector(".btn4");
const war = document.querySelector(".btn5");

let currentPage = 1;
let query = "";

async function fetchRandomNews(page = 1) {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=9&page=${page}&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching random news", error);
    return [];
  }
}
async function fetchHome(page = 1) {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=9&page=${page}&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching random news", error);
    return [];
  }
}

async function fetchRandomSport(page = 1) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=sport&pageSize=4&page=${page}&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching sport news", error);
    return [];
  }
}
async function fetchRandomDisasters(page = 1) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=disasters&pageSize=4&page=${page}&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching dissaters news", error);
    return [];
  }
}
async function fetchRandomTraffic(page = 1) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=accident&pageSize=4&page=${page}&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching traffic news", error);
    return [];
  }
}
async function fetchRandomWar(page = 1) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=war nuclear&pageSize=4&page=${page}&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching war news", error);
    return [];
  }
}

home.addEventListener("click", async () => {
  currentPage = 1;
  try {
    const articles = await fetchHome(currentPage);
    displayBlogs(articles, true);
  } catch (error) {
    console.log("Error fetching news", error);
  }
});

war.addEventListener("click", async () => {
  currentPage = 1;
  try {
    const articles = await fetchRandomWar(currentPage);
    displayBlogs(articles, true);
  } catch (error) {
    console.log("Error fetching news", error);
  }
});

traffic.addEventListener("click", async () => {
  currentPage = 1;
  try {
    const articles = await fetchRandomTraffic(currentPage);
    displayBlogs(articles, true);
  } catch (error) {
    console.log("Error fetching news", error);
  }
});
disasters.addEventListener("click", async () => {
  currentPage = 1;
  try {
    const articles = await fetchRandomDisasters(currentPage);
    displayBlogs(articles, true);
  } catch (error) {
    console.log("Error fetching news", error);
  }
});
sport.addEventListener("click", async () => {
  currentPage = 1;
  try {
    const articles = await fetchRandomSport(currentPage);
    displayBlogs(articles, true);
  } catch (error) {
    console.log("Error fetching news", error);
  }
});

button.addEventListener("click", async () => {
  query = search.value.trim();
  currentPage = 1;
  if (query !== "") {
    try {
      const articles = await fetchNewsQuery(query, currentPage);
      displayBlogs(articles, true);
    } catch (error) {
      console.log("Error fetching news", error);
    }
  }
});

showMore.addEventListener("click", async () => {
  currentPage++;
  if (query !== "") {
    const articles = await fetchNewsQuery(query, currentPage);
    displayBlogs(articles, false);
  } else {
    const articles = await fetchRandomNews(currentPage);

    displayBlogs(articles, false);
  }
});

async function fetchNewsQuery(query, page = 1) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=4&page=${page}&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching news", error);
    return [];
  }
}

function displayBlogs(articles, clear = false) {
  if (clear) {
    blogContainer.innerHTML = "";
  }
  if (!articles || articles.length === 0) {
    blogContainer.innerHTML += "<p>No more articles available.</p>";
    return;
  }
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("card");
    const pic = document.createElement("div");
    pic.classList.add("pic");
    const text = document.createElement("div");
    text.classList.add("text");
    const img = document.createElement("img");
    img.src = article.urlToImage || "default-image.jpg";
    img.alt = article.title || "No image available";

    const title = document.createElement("h2");
    const trimTitle = article.title
      ? article.title.length > 30
        ? article.title.slice(0, 30) + "..."
        : article.title + "."
      : "No title available.";

    title.textContent = trimTitle;

    const description = document.createElement("p");
    const trimDes = article.description
      ? article.description.length > 150
        ? article.description.slice(0, 150) + "..."
        : article.description + "."
      : "No description available.";

    description.textContent = trimDes;
    text.appendChild(title);
    text.appendChild(description);
    pic.appendChild(img);
    blogCard.appendChild(pic);
    blogCard.appendChild(text);

    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });

    blogContainer.appendChild(blogCard);
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews();

    displayBlogs(articles);
  } catch (error) {
    console.error("Error fetching", error);
  }
})();
