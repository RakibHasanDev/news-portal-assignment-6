//load category
const loadData = () => {
    const url = "https://openapi.programming-hero.com/api/news/categories"
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
        .catch(error => console.log(error));

}
// added category 
const displayCategory = (categories) => {
    const ul = document.getElementById("ul-container");

    categories.forEach(category => {
        const { category_name, category_id } = category;
        //  console.log(category) 
        const li = document.createElement('li');
        li.classList.add('inline-block')
        li.innerHTML = ` <liclass="d-inline-block"><button onclick="loadSingleCategory(${category_id} , '${category_name}')" class="no-background">${category_name}</button> </li>`
        ul.appendChild(li);


    })


}
//load news id and name
const loadSingleCategory = async (id, name) => {
    // spinner start 
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('d-none')

    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayAllCategory(data.data, name))
        .catch(error => console.log(error));

}

//sorating data and display

const displayAllCategory = (allNewses, name) => {
    const datas = [...allNewses]

        //shorting data

    const newses = datas.sort((a, b) => {
        return b.total_view - a.total_view;
    })
    // console.log(newses);
    const iteamFound = document.getElementById('Category-found');
    iteamFound.innerHTML = ``;
    const newsLength = newses.length;
    // console.log(newsLength)
    iteamFound.innerHTML = `<h6 class="bg-white p-4" > <b>${newsLength}</b> items found for category <b>${name}</b></h6> `

    const noFound = document.getElementById('no-Found')
    noFound.innerHTML = ``
    if (newsLength === 0) {
        noFound.innerHTML = `<h1 class="bg-white p-3 text-center" > No News Found</h1> `
    }

    //spinner stop
    const spinner = document.getElementById('spinner');
    spinner.classList.add('d-none');
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ``;
    // console.log(newses);
    newses.forEach(news => {
        //  console.log(news)
        const { image_url, title, details, total_view, _id } = news;
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
        <div class="card mb-4 w-100" style="min-width: 300px;">
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
                            <p class="d-inline">${news.author.name ? news.author.name : 'No Data Available'}</p> <br>
                            <p class="d-inline">${news.author.published_date ? news.author.published_date : 'No Data Available'}</p> <br>
                        </div>
                    
                        <div class="p-2">
                            <i class="fa-regular fa-eye"></i> <span class="px-2">${total_view ? total_view : 'No Data Available'}</span>
                    
                        </div>
                        <div class="p-2 text-dark d-none d-md-block">
                            <span>${news.rating.number ? news.rating.number :"No Rating"}</span>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                        </div>                  
                        <button onclick="loadDetails('${_id}')"  type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#seeDetailsModal">See Details</button>
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
        
        `

        cardContainer.appendChild(cardDiv)

    })


}

//load news details for modal
const loadDetails = (newsid) => {

    const url = `https://openapi.programming-hero.com/api/news/${newsid}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data[0]))
        .catch(error => console.log(error));


}

const displayDetails = (newsDetails) => {
    // console.log(newsDetails)
    const { thumbnail_url, title, details, total_view } = newsDetails;
    const modalTitle = document.getElementById('seeDetailsModalLabel')
    modalTitle.innerHTML = `${title}`
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = ``;
    const cardDiv = document.createElement('div')
    cardDiv.innerHTML = `
    <div class="card" style="width:100%">
  <img src="${thumbnail_url}" class=" modal-img" alt="...">
  <div class="card-body">
    <p class="card-text">${details.length > 150 ? details.slice(0, 150) + '......' : details}</p>
    <div class="d-flex mb-3 align-items-center justify-content-evenly">
                        <div class="p-2">
                            <img class="author-img" src="${newsDetails.author.img}" alt="">
                        </div>
                        <div>
                            <p class="d-inline">${newsDetails.author.name ? newsDetails.author.name : 'No Data Available'}</p> <br>
                            <p class="d-inline">${newsDetails.author.published_date ? newsDetails.author.published_date : 'No Data Available'}</p> <br>
                        </div>
                        <div class="p-2">
                            <i class="fa-regular fa-eye"></i> <span class="px-2">${total_view ? total_view : 'No Data Available'}</span>
                        </div>
                         <div class="p-2 text-dark">
                            <span>${newsDetails.rating.number ? newsDetails.rating.number : "No Rating"}</span>
                            <i class="fa-solid fa-star-half-stroke"></i>
                        </div> 
                    </div>
  </div>
</div>

    `
    modalBody.appendChild(cardDiv)


}



loadData();