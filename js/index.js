
const loadData = async () => {
    const url = "https://openapi.programming-hero.com/api/news/categories"
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category)

}

const displayCategory = (categories) => {
    const ul = document.getElementById("ul-container");
    
    categories.forEach(category => {
        const { category_name, category_id } = category;
        console.log(category)
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
    console.log(data.data);

}

// const displayAllCategory = (dataBYId) => {
//     console.log(dataBYId);
    
// }

loadData();