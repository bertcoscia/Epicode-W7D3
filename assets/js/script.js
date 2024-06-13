let shoppingCartArray = [];

const generateCards = booksObject => {
  const row = document.querySelector(".row");
  booksObject.forEach(book => {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("id", `${book.asin}`);

    // genero l'immagine della card
    const cardImg = document.createElement("img");
    cardImg.src = book.img;
    cardImg.className = "card-img-top object-fit-cover";
    cardImg.setAttribute("alt", `Cover of the book ${book.title}`);
    card.appendChild(cardImg);

    // genero il div card-body
    const cardBody = document.createElement("div");
    cardBody.className = "card-body position-relative";
    card.appendChild(cardBody);

    // genero il card-title
    const cardTitle = document.createElement("h5");
    cardTitle.innerText = `${book.title}`;
    cardTitle.className = "card-title";
    cardBody.appendChild(cardTitle);

    // genero il card-text
    const cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.innerHTML = `Category: ${book.category} <br> Price: $${book.price}`;
    cardBody.appendChild(cardText);

    // genero il button group
    const buttonGroup = document.createElement("div");
    buttonGroup.className = "btn-group";
    buttonGroup.setAttribute("role", "group");
    cardBody.appendChild(buttonGroup);

    // genero il bottone scarta
    const discardBtn = document.createElement("button");
    discardBtn.className = "btn btn-danger delete-btn";
    discardBtn.innerText = "Delete book";
    discardBtn.addEventListener("click", () => {
      col.remove();
    });
    buttonGroup.appendChild(discardBtn);

    // genero il bottone compra
    const buyBtn = document.createElement("button");
    buyBtn.className = "btn btn-success buy-btn";
    buyBtn.innerText = "Add to cart";
    // invoco la funzione addToCart
    buyBtn.addEventListener("click", () => addToCart(book));
    buttonGroup.appendChild(buyBtn);

    // genero il div che contiene la card
    const col = document.createElement("div");
    col.classList.add("col");
    col.appendChild(card);
    row.appendChild(col);
  });
};

const addToCart = book => {
  if (!shoppingCartArray.some(bookInArray => bookInArray.asin === book.asin)) {
    shoppingCartArray.push(book);
    localStorage.setItem("shoppingCart-memory", JSON.stringify(shoppingCartArray));
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
    deleteItemBtn.classList.add("bi", "bi-trash3");
    deleteItemBtn.setAttribute("viewBox", "0 0 16 16");
    deleteItemBtn.innerHTML = ` <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>`;
    itemPriceAndDeleteContainer.appendChild(deleteItemBtn);

    itemDescription.appendChild(itemPriceAndDeleteContainer);

    shoppingCartModalBody.appendChild(item);

    const cartBadge = document.getElementById("cartBadge");

    cartBadge.innerText = shoppingCartArray.length;

    if (shoppingCartArray.length > 0) {
      cartBadge.classList.remove("d-none");
    }

    deleteItemBtn.addEventListener("click", () => {
      shoppingCartArray.splice(shoppingCartArray.indexOf(book), 1);
      console.log("books in cart", shoppingCartArray);
      localStorage.setItem("shoppingCart-memory", JSON.stringify(shoppingCartArray));
      const cardToRemove = document.getElementById(book.title);
      cardToRemove.remove();
      cartBadge.innerText = shoppingCartArray.length;
      if (shoppingCartArray.length === 0) {
        cartBadge.classList.add("d-none");
      }
    });
  } else {
    window.alert("You have already added this book to your shopping cart");
  }
  console.log("books in cart", shoppingCartArray);
};

const fetchBooks = () => {
  // mando la richiesta get attraverso fetch
  fetch("https://striveschool-api.herokuapp.com/books")
    .then(responseObject => {
      // controllo che la risposta sia andata a buon fine vedendo se la proprieta ok dell'oggetto di risposta sia vero o false
      if (responseObject.ok) {
        // in caso positivo ritorno l'oggetto di risposta convertito in JSON
        return responseObject.json();
      } else {
        // in caso negativo lancio un errore e non eseguo i successivi .this
        throw new Error("Couldn't get data");
      }
    })
    .then(booksObject => {
      console.log(booksObject);

      // creo una card per ogni elemento
      generateCards(booksObject);
    })
    .catch(error => console.log(error));
};

const getBooksFromStorage = () => {
  const shoppingCartFromStorage = localStorage.getItem("shoppingCart-memory");
  if (shoppingCartFromStorage) {
    const shoppingCartFromStorageArray = JSON.parse(shoppingCartFromStorage);
    shoppingCartArray = shoppingCartFromStorageArray;
    console.log("books in memory ", shoppingCartArray);
    shoppingCartArray.forEach(book => {
      const shoppingCartModalBody = document.querySelector(".modal-body");
      const item = document.createElement("div");
      item.className = "row mb-3";
      item.setAttribute("id", `${book.title}`);

      const itemImg = document.createElement("img");
      itemImg.setAttribute("src", `${book.img}`);
      itemImg.className = "col-4";
      item.appendChild(itemImg);

      const itemDescription = document.createElement("div");
      itemDescription.className = "col-8 row";
      item.appendChild(itemDescription);

      const itemName = document.createElement("h5");
      itemName.className = "col-12";
      itemName.innerText = book.title;
      itemDescription.appendChild(itemName);

      const itemPriceAndDeleteContainer = document.createElement("div");
      itemPriceAndDeleteContainer.className = "col-12 d-flex justify-content-between";

      const itemPrice = document.createElement("p");
      itemPrice.innerText = `$${book.price}`;
      itemPriceAndDeleteContainer.appendChild(itemPrice);

      const deleteItemBtn = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      deleteItemBtn.setAttribute("width", "30");
      deleteItemBtn.setAttribute("height", "30");
      deleteItemBtn.setAttribute("fill", "currentColor");
      deleteItemBtn.classList.add("bi", "bi-trash3");
      deleteItemBtn.setAttribute("viewBox", "0 0 16 16");
      deleteItemBtn.innerHTML = ` <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>`;
      itemPriceAndDeleteContainer.appendChild(deleteItemBtn);

      itemDescription.appendChild(itemPriceAndDeleteContainer);

      const cartBadge = document.getElementById("cartBadge");

      cartBadge.innerText = shoppingCartArray.length;

      if (shoppingCartArray.length > 0) {
        cartBadge.classList.remove("d-none");
      }

      shoppingCartModalBody.appendChild(item);
      deleteItemBtn.addEventListener("click", () => {
        shoppingCartArray.splice(shoppingCartArray.indexOf(book), 1);
        console.log("books in cart", shoppingCartArray);
        localStorage.setItem("shoppingCart-memory", JSON.stringify(shoppingCartArray));
        const cardToRemove = document.getElementById(`${book.title}`);
        cardToRemove.remove();
        cartBadge.innerText = shoppingCartArray.length;
        if (shoppingCartArray.length === 0) {
          cartBadge.classList.add("d-none");
        }
      });
    });
  }
};

window.addEventListener("DOMContentLoaded", () => {
  fetchBooks();
  getBooksFromStorage();
});
