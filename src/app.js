const inputRef = document.querySelector("#bookmarkInput")
const btnRef = document.querySelector("#addBookmarkBtn")
const listRef = document.querySelector("#bookmarkList")




const bookArray = JSON.parse(localStorage.getItem("key")) || [];
console.log(bookArray);



btnRef.addEventListener("click", () => {
    const urlValue = inputRef.value 
    if(urlValue){
        bookArray.push(urlValue)
        inputRef.value = ""
        saveAndRender()
        localStorage.setItem("key", JSON.stringify(bookArray))
        renderArray()
    }    
    //  console.log(bookArray);   
})


listRef.addEventListener("click", (event) => {
   
    const target = event.target.nodeName
    if(target !== "BUTTON"){
        return
    }
    //  console.log(target);
    const index = event.target.dataset.index;
  
    bookArray.splice(index, 1);
    saveAndRender()
    localStorage.setItem("key", JSON.stringify(bookArray))
    renderArray(); 
})



function renderArray () {
    const item = bookArray.map((url, index) => {
        return `<li>
        <a href="${url}">${url}</a>
        <button type="button" data-action="${index}">Видалити</button>
    </li>`
    }).join("")

    listRef.innerHTML = item
}


function saveAndRender() {
    localStorage.setItem("key", JSON.stringify(bookArray));
    renderArray();
}

renderArray()





///////////////////////////////////////////////////////////////////////////////////////////////////////





// .Форма збереження даних
// Створіть просту форму з полями вводу і кнопкою, яка зберігає дані в localStorage. При наступному завантаженні сторінки зчитайте збережені дані з localStorage та відобразіть їх у відповідних полях вводу.


const userValue = document.querySelector('#username')
const passwordValue = document.querySelector('#password')
const saveBtn = document.querySelector('#saveBtn')


userValue.value = localStorage.getItem("name") || "";
passwordValue.value = localStorage.getItem("password") || "";


userValue.addEventListener("input", (event) => {
    const value = event.target.value.trim()
    localStorage.setItem("name", value)
})


passwordValue.addEventListener("input", (event) => {
    const value = event.target.value.trim()
    localStorage.setItem("password", value)
})


saveBtn.addEventListener("click", (event) => {
    event.preventDefault()
    userValue.value = ""
    passwordValue.value = ""
})


function checkStorage() {
    const savedName = localStorage.getItem("name")
    const savedPassword = localStorage.getItem("password")

    userValue.value = savedName
    passwordValue.value = savedPassword
}
checkStorage()



/////////////////////////////////////////////////////////////////////////




import template from "./template.hbs";
import products from "./products.json";



const container = document.querySelector("body");

const markup = template(products);

container.insertAdjacentHTML("beforeend", markup);


const search = document.querySelector("#search");

search.addEventListener("input", (event) => {
  const value = event.target.value.toLowerCase();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(value)
  );

  const markup = template(filteredProducts);
  container.innerHTML = markup;
});
