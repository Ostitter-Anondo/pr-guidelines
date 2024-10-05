
function loadArticleCards(type) {
  fetch("https://ostitter-anondo.github.io/pr-articles-api/articles.json")
    .then(articles => articles.json())
    .then(articles => showCards(articles, type))
    .catch(err => console.log(err));
}
function showCards(articles, id) {
  const div = document.getElementById("sample-cards");
  div.innerHTML = "";
  if (id === "all-btn"){
    for (article of articles){
      let item = document.createElement("div");
      item.classList.add("card", "bg-base-100", "w-96");
      item.innerHTML = `
        <div class="card-body">
          <h2 class="card-title">
            ${article.title}
            <div class="badge badge-secondary">${article.type}</div>
          </h2>
          <p>${article.summary}</p>
          <button id="${article.id}" class="btn btn-ghost">Read More</button>
          <div class="card-actions justify-end">
            <div class="badge badge-outline">${article.date}</div>
          </div>
        </div>
      `;
      div.appendChild(item)
    }
  } 
  else if (id === "offline-btn"){
    for (article of articles){
      if (article.type === "offline"){
      let item = document.createElement("div");
      item.classList.add("card", "bg-base-100", "w-96");
      item.innerHTML = `
        <div class="card-body">
          <h2 class="card-title">
            ${article.title}
            <div class="badge badge-secondary">${article.type}</div>
          </h2>
          <p>${article.summary}</p>
          <button id="${article.id}" class="btn btn-ghost">Read More</button>
          <div class="card-actions justify-end">
            <div class="badge badge-outline">${article.date}</div>
          </div>
        </div>
      `;
      div.appendChild(item);
    }
    }
  } 
  else if (id === "online-btn"){
    for (article of articles){
      if (article.type === "online"){
        let item = document.createElement("div");
        item.classList.add("card", "bg-base-100", "w-96");
        item.innerHTML = `
          <div class="card-body">
            <h2 class="card-title">
              ${article.title}
              <div class="badge badge-secondary">${article.type}</div>
            </h2>
            <p>${article.summary}</p>
            <button id="${article.id}" class="btn btn-ghost">Read More</button>
            <div class="card-actions justify-end">
              <div class="badge badge-outline">${article.date}</div>
            </div>
          </div>
        `;
        div.appendChild(item);
      }
    }
  } 
}

function loadSingleArticle(articleId) {
  fetch("https://ostitter-anondo.github.io/pr-articles-api/articles.json")
    .then(articles => articles.json())
    .then(articles => showArticle(articles, articleId))
    .catch(err => console.log(err));
}
function showArticle(articles, reqId){
  const div = document.getElementById("sample-view");
  let articleTitle = document.createElement("h3");
  articleTitle.classList.add("text-2xl", "text-center", "font-bold", "underline");
  let articleBody = document.createElement("div");
  articleBody.classList.add("text-lg", "text-justify", "font-md", "flex", "flex-col", "gap-6");
  for (article of articles){
    if (article.id === reqId){
      articleTitle.innerText = article.title;
      for (item of article.content){
        if (item[0] === "txt"){
          p = document.createElement("p");
          p.innerHTML = item[1];
          articleBody.appendChild(p);
        }
        else if (item[0] === "img"){
          img = document.createElement("img");
          img.src = item[1];
          articleBody.appendChild(img);
        }
      }
      div.innerHTML = ""
      div.appendChild(articleTitle);
      div.appendChild(articleBody);
    }
  }
}
document.getElementById("sample-cat").addEventListener('click', function(event){
  loadArticleCards(event.target.id);
});
document.getElementById("sample-cards").addEventListener('click', function(event){
  if (event.target.classList[0] === 'btn'){
    loadSingleArticle(event.target.id);
  }
});

