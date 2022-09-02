
const loadData = async () => {
    const url = "https://openapi.programming-hero.com/api/news/categories"
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category)

}

const displayCategory = (categories) => {
    const ul = document.getElementById("ul-container");
    
    categories.forEach(category => {
        const { category_name, category_id} = category;
        // console.log(category)
        const li = document.createElement('li');
        li.classList.add('d-inline-block')
        li.innerHTML = ` <li onclick="loadSingleCategory(${category_id})"class="d-inline-block">${category_name}</li>`
        ul.appendChild(li);
    })
    
    
}

const loadSingleCategory = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayAllCategory(data.data);

}

const displayAllCategory = async (newses) => {

    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ``;
    console.log(newses);
    newses.forEach(news => {
        console.log(news)
        const { image_url, title, details } = news;
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
        <div class="card mb-3 w-100 my-4" style="min-width: 400px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${image_url}" class="img-fluid rounded-start h-100" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${details.length > 150 ? details.slice(0, 150) + '...' : details}</p>
                    <div class="d-flex mb-3 align-items-center justify-content-evenly">
                        <div class="p-2">
                            <img class="author-img" src="" alt="">
                        </div>
                        <div>
                            <p class="d-inline">Name:</p> <br>
                            <p class="d-inline">Date:</p> <br>
                        </div>
                    
                        <div class="p-2">
                            <i class="fa-regular fa-eye"></i> <span class="px-2">views</span>
                    
                        </div>
                        <div></div>
                        <div class="p-2 text-warning">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                        </div>                  
                        <button class="btn btn-primary text-white d-block"> See Details</button>
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
        
        `

        cardContainer.appendChild(cardDiv)
        
    })

    
}

loadData();