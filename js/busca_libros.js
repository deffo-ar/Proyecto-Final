
async function fetchBooks(tipo, termino, cantidad) {

    console.log (tipo, termino, cantidad);
    const apiUrl = 'https://www.googleapis.com/books/v1/volumes?language=es&q='+termino+'&maxResults='+cantidad;

    try {
        const response = await fetch(apiUrl);
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data.items);
        if (tipo === 'masleidos') {
            displayBooks(data.items);
        } else if (tipo === "masaclamados") {
            displayBooksAclamados(data.items);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayBooks(books) {

    const booksContainer = document.getElementById('peliculas');
    booksContainer.innerHTML = '';

    books.forEach(book => {

        booksContainer.innerHTML += `
        <a href="./pages/detalle.html">
        <div class="pelicula">
        <img class="imgTendencia" src="${book.volumeInfo.imageLinks.thumbnail}" alt="${book.volumeInfo.title}">
        <div class="tituloPelicula">
            <h4>${book.volumeInfo.title}</h4>
        </div>    
        </div>  
        </a>      
        `;
    });
    }

function displayBooksAclamados(booksAclamados) {

    const booksContainerAclamados = document.getElementById('aclamadas');
    booksContainerAclamados.innerHTML = '';

    booksAclamados.forEach(bookAclamados => {

        booksContainerAclamados.innerHTML += `
            <div class="peliculaItem">
            <img class="imgAclamada" src="${bookAclamados.volumeInfo.imageLinks.smallThumbnail}" alt="${bookAclamados.volumeInfo.title}"> 
        </div>     
        `;
    });
}

/* Llama a la función cuando carga la página */
document.addEventListener("DOMContentLoaded", function () {
    // Busca para Más Leídos
    fetchBooks('masleidos', 'stephen', '10');
    // Busca para Más Aclamados
    fetchBooks('masaclamados', 'potter', '12');
});