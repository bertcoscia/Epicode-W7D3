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

      const shoppingCart = [];

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

        // genero il div d-flex che contiene i bottoni
        /*   const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("row");
        buttonsContainer.classList.add("col-12");
        buttonsContainer.classList.add("row-cols-2");
        buttonsContainer.classList.add("buttons-container");
        cardBody.appendChild(buttonsContainer); */

        // genero il bottone scarta
        const discardBtn = document.createElement("button");
        discardBtn.classList.add("btn");
        discardBtn.classList.add("btn-danger");
        discardBtn.classList.add("delete-btn");
        discardBtn.classList.add("d-block");
        discardBtn.innerText = "Delete book";
        discardBtn.addEventListener("click", () => {
          card.classList.add("d-none");
        });
        cardBody.appendChild(discardBtn);

        // genero il bottone compra
        const buyBtn = document.createElement("button");
        buyBtn.classList.add("btn");
        buyBtn.classList.add("btn-success");
        buyBtn.classList.add("buy-btn");
        buyBtn.classList.add("d-block");
        buyBtn.innerText = "Buy book";
        buyBtn.addEventListener("click", () => {
          // variabile flag
          let isDuplicate = false;

          // per ogni elemento di shoppingCart: se l'oggetto selezionato esiste già non si potrà continuare
          shoppingCart.forEach((bookInArray) => {
            if (bookInArray.asin === book.asin && bookInArray.category === book.category && bookInArray.img === book.img && bookInArray.price === book.price && bookInArray.title === book.title) {
              isDuplicate = true;
              window.alert("You have already added this book to your shopping cart");
            }
          });
          if (!isDuplicate) {
            shoppingCart.push(book);
          }
          console.log(shoppingCart);
        });
        cardBody.appendChild(buyBtn);

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
