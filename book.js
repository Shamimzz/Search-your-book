// Declare all the variable ............
const inputFeild = document.getElementById('search-feild');
const button = document.getElementById('button');
const searchResult = document.getElementById('search-result');
const errorText = document.getElementById('error');
const bookContainer = document.getElementById('book-container');


// search button click...............
button.addEventListener('click', searchBook = () => {
    const searchText = inputFeild.value;
    inputFeild.value = ''
    if (searchText === '') {
        errorText.innerText = 'Input Feild can not be empty'
        errorText.classList.remove('d-none');
        searchResult.style.display = "none";
        bookContainer.textContent=''
        return
    }

    const url = `https://openlibrary.org/search.json?q=${searchText}`
    spinner.classList.remove("d-none");
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            //  used time segment for  removing the spinnner, and showing data in 1 sec.
            setTimeout(() => {
                spinner.classList.add("d-none");
                showBook(data);
            }, 1000);
        })
})

const showBook = books => {
    bookContainer.textContent = '';
    const book = books.docs;
    const numFound = books.numFound;

    if (numFound === 0) {
        errorText.classList.remove('d-none');
        errorText.innerText = 'Hey Search result not found'
        searchResult.style.display = "none";
        return
    }
    else {
        errorText.classList.add('d-none')
    }
   
    book.forEach(details => {
        searchResult.style.display = "block";
        searchResult.innerHTML = `
        Search result found: <span>${book.length}</span> of <span>${numFound}</span>
        
        `
        // Handaling undefined.........
        if (!details.author_name) {
            details.author_name='sorry! Author name not found'
        }
        if (!details.first_publish_year) {
            details.first_publish_year='sorry! publish year not found'
        }
        if (!details.publisher) {
            details.publisher='sorry! publisher not found'
        }

        // show book...............
        const imageUrl = `https://covers.openlibrary.org/b/id/${details.cover_i}-M.jpg`
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
             <img src="${imageUrl}" class="card-img-top"  height="350px" width="300px">
                 <div class="card-body">
                   <h5 class="card-title">${details.title}</h5>
                   <p class="card-text">Author Name: ${details.author_name}</p>
                   <p class="card-text">First Publish: ${details.first_publish_year}</p>
                   <p class="card-text">Publisher: ${details.publisher}</p>
                 </div>
            </div>
           `;
        bookContainer.appendChild(div);
    });
}
