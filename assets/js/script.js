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

      const shoppingCartArray = [];

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
        buyBtn.innerText = "Add to cart";

        // genero il div che contiene la card
        const col = document.createElement("div");
        col.classList.add("col");
        col.appendChild(card);
        row.appendChild(col);

        buyBtn.addEventListener("click", () => {
          // variabile flag
          let isDuplicate = false;

          const shoppingCartModalBody = document.querySelector(".modal-body");

          // per ogni elemento di shoppingCart: se l'oggetto selezionato esiste già non si potrà continuare
          shoppingCartArray.forEach((bookInArray, index) => {
            if (bookInArray.asin === book.asin && bookInArray.category === book.category && bookInArray.img === book.img && bookInArray.price === book.price && bookInArray.title === book.title) {
              isDuplicate = true;
              window.alert("You have already added this book to your shopping cart");
            } else {
              const item = document.createElement("div");
              item.classList.add("row");
              item.classList.add("mb-3");
              item.setAttribute("id", `${bookInArray.title}`);

              const itemImg = document.createElement("img");
              itemImg.setAttribute("src", `${bookInArray.img}`);
              itemImg.classList.add("col-4");
              item.appendChild(itemImg);

              const itemDescription = document.createElement("div");
              itemDescription.classList.add("col-8");
              itemDescription.classList.add("row");
              item.appendChild(itemDescription);

              const itemName = document.createElement("h5");
              itemName.classList.add("col-12");
              itemName.innerText = bookInArray.title;
              itemDescription.appendChild(itemName);

              const itemPriceAndDeleteContainer = document.createElement("div");
              itemPriceAndDeleteContainer.classList.add("col-12");
              itemPriceAndDeleteContainer.classList.add("d-flex");
              itemPriceAndDeleteContainer.classList.add("justify-content-between");
              const itemPrice = document.createElement("p");
              itemPrice.innerText = `$${bookInArray.price}`;
              const deleteItemBtn = document.createElement("svg");
              deleteItemBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg>`;

              itemPriceAndDeleteContainer.appendChild(itemPrice);
              itemPriceAndDeleteContainer.appendChild(deleteItemBtn);
              itemDescription.appendChild(itemPriceAndDeleteContainer);

              shoppingCartModalBody.appendChild(item);
              deleteItemBtn.addEventListener("click", () => {
                shoppingCartArray.splice(index, 1);
                console.log(shoppingCartArray);
                const cardToRemove = document.getElementById(`${bookInArray.title}`);
                cardToRemove.classList.add("d-none");
              });
            }
          });
          if (!isDuplicate) {
            shoppingCartArray.push(book);
          }
          console.log(shoppingCartArray);
        });
        cardBody.appendChild(buyBtn);
      });
    })
    .catch((error) => console.log(error));
};

window.addEventListener("DOMContentLoaded", () => {
  fetchBooks();
});
