
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
        li.classList.add('d-md-inline-block')
        li.innerHTML = ` <li onclick="loadSingleCategory(${category_id} , '${category_name}')"class="d-inline-block">${category_name}</li>`
        ul.appendChild(li);

        
    })
    
    
}

const loadSingleCategory = async (id, name) => {
    // spinner start 
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('d-none')

    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayAllCategory(data.data, name);
    

}

const displayAllCategory = async (newses, name) => {
    
    
    const iteamFound = document.getElementById('Category-found');
    iteamFound.innerHTML = ``;
    const newsLength = newses.length;
    console.log(newsLength)
    iteamFound.innerHTML = `<h6 class="bg-white p-3" > ${newsLength} items found for category ${name}</h6> `

    const noFound = document.getElementById('no-Found')
    noFound.innerHTML = ``
    if (newsLength === 0) {
        noFound.innerHTML = `<h1 class="bg-white p-3" > No News Found</h1> `
    }

    //spinner stop
    const spinner = document.getElementById('spinner');
    spinner.classList.add('d-none');


   
    
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ``;
    console.log(newses);
    newses.forEach(news => {
        // console.log(news)
        const { image_url, title, details, total_view } = news;
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
        <div class="card mb-3 w-100 my-4" style="min-width: 300px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${image_url}" class="img-fluid rounded-start h-100" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${details.length > 150 ? details.slice(0, 150) + '......' : details}</p>
                    <div class="d-flex mb-3 align-items-center justify-content-evenly">
                        <div class="p-2">
                            <img class="author-img" src="${news.author.img}" alt="">
                        </div>
                        <div>
                            <p class="d-inline">${news.author.name ? news.author.name :'No name'}</p> <br>
                            <p class="d-inline">${news.author.published_date ? news.author.published_date :'No Publish Date' }</p> <br>
                        </div>
                    
                        <div class="p-2">
                            <i class="fa-regular fa-eye"></i> <span class="px-2">${total_view ? total_view : 'No View'}</span>
                    
                        </div>
                        <div></div>
                        <div class="p-2 text-dark">
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