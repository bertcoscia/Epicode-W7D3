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

        // genero il button group
        const buttonGroup = document.createElement("div");
        buttonGroup.classList.add("btn-group");
        buttonGroup.setAttribute("role", "group");
        cardBody.appendChild(buttonGroup);

        // genero il bottone scarta
        const discardBtn = document.createElement("button");
        discardBtn.classList.add("btn");
        discardBtn.classList.add("btn-danger");
        discardBtn.classList.add("delete-btn");
        discardBtn.innerText = "Delete book";
        discardBtn.addEventListener("click", () => {
          card.remove();
        });
        buttonGroup.appendChild(discardBtn);

        // genero il bottone compra
        const buyBtn = document.createElement("button");
        buyBtn.classList.add("btn");
        buyBtn.classList.add("btn-success");
        buyBtn.classList.add("buy-btn");
        buyBtn.innerText = "Add to cart";
        buttonGroup.appendChild(buyBtn);

        // genero il div che contiene la card
        const col = document.createElement("div");
        col.classList.add("col");
        col.appendChild(card);
        row.appendChild(col);

        buyBtn.addEventListener("click", () => {
          // se almeno un alemento dell'array ha un asin uguale a quello selezionato, quest'ultimo non viene pushato nell'array
          if (!shoppingCartArray.some((bookInArray) => bookInArray.asin === book.asin)) {
            shoppingCartArray.push(book);
            const shoppingCartModalBody = document.querySelector(".modal-body");
            const item = document.createElement("div");
            item.classList.add("row", "mb-3");
            item.setAttribute("id", `${book.title}`);

            const itemImg = document.createElement("img");
            itemImg.setAttribute("src", `${book.img}`);
            itemImg.classList.add("col-4");
            item.appendChild(itemImg);

            const itemDescription = document.createElement("div");
            itemDescription.classList.add("col-8", "row");
            item.appendChild(itemDescription);

            const itemName = document.createElement("h5");
            itemName.classList.add("col-12");
            itemName.innerText = book.title;
            itemDescription.appendChild(itemName);

            const itemPriceAndDeleteContainer = document.createElement("div");
            itemPriceAndDeleteContainer.classList.add("col-12", "d-flex", "justify-content-between");

            const itemPrice = document.createElement("p");
            itemPrice.innerText = `$${book.price}`;
            itemPriceAndDeleteContainer.appendChild(itemPrice);

            const deleteItemBtn = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            deleteItemBtn.setAttribute("width", "30");
            deleteItemBtn.setAttribute("height", "30");
            deleteItemBtn.setAttribute("fill", "currentColor");
            deleteItemBtn.classList.add("bi", "bi-x-lg");
            deleteItemBtn.setAttribute("viewBox", "0 0 16 16");
            deleteItemBtn.innerHTML = `<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>`;
            itemPriceAndDeleteContainer.appendChild(deleteItemBtn);
            itemDescription.appendChild(itemPriceAndDeleteContainer);

            shoppingCartModalBody.appendChild(item);

            deleteItemBtn.addEventListener("click", () => {
              shoppingCartArray.splice(shoppingCartArray.indexOf(book), 1);
              console.log(shoppingCartArray);
              const cardToRemove = document.getElementById(`${book.title}`);
              cardToRemove.remove();
            });
          } else {
            window.alert("You have already added this book to your shopping cart");
          }
          console.log(shoppingCartArray);
        });
      });
    })
    .catch((error) => console.log(error));
};

window.addEventListener("DOMContentLoaded", () => {
  fetchBooks();
});
