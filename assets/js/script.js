const fetchBooks = () => {
  // mando la richiesta get attraverso fetch
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((responseObject) => {
      // controllo che la risposta sia andata a buon fine vedendo se la proprieta ok dell'oggetto di risposta sia vero o false
      if (responseObject.ok) {
        // in caso positivo ritorno l'oggetto di risposta convertito in JSON
        return responseObject.json();
      } else {
        // in caso negativo lancio un errore e non eseguo i successivi .this
        throw new Error("Couldn't get data");
      }
    })
    .then((booksObject) => {
      console.log(booksObject);

      // creo un riferimento al .row
      const row = document.querySelector(".row");

      /* const deleteCard = () => {
        console.log("hello world");
        const actualCard = document.getElementById(`${book.asin}`);
        actualCard.remove();
      }; */

      // creo una card per ogni elemento
      booksObject.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("id", `${book.asin}`);

        // genero l'immagine della card
        const cardImg = document.createElement("img");
        cardImg.setAttribute("src", `${book.img}`);
        cardImg.classList.add("card-img-top");
        cardImg.classList.add("object-fit-cover");
        cardImg.setAttribute("alt", `Cover of the book ${book.title}`);
        card.appendChild(cardImg);

        // genero il div card-body
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardBody.classList.add("postion-relative");
        card.appendChild(cardBody);

        // genero il card-title
        const cardTitle = document.createElement("h5");
        cardTitle.innerText = `${book.title}`;
        cardTitle.classList.add("card-title");
        cardBody.appendChild(cardTitle);

        // genero il card-text
        const cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.innerText = `Category: ${book.category}
        Price: $${book.price}`;
        cardBody.appendChild(cardText);

        // genero il bottone scarta
        const discardBtn = document.createElement("button");
        discardBtn.classList.add("btn");
        discardBtn.classList.add("btn-danger");
        discardBtn.classList.add("delete-btn");
        discardBtn.classList.add("position-absolute");
        discardBtn.classList.add("bottom-0");
        discardBtn.classList.add("start-0");
        discardBtn.innerText = "Delete book";
        discardBtn.addEventListener("click", () => {
          card.classList.add("d-none");
        });
        cardBody.appendChild(discardBtn);

        // genero il div che contiene la card
        const col = document.createElement("div");
        col.classList.add("col");
        col.appendChild(card);
        row.appendChild(col);
      });
    })
    .catch((error) => console.log(error));
};

window.addEventListener("DOMContentLoaded", () => {
  fetchBooks();
});
