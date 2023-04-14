const prevBtnEl = document.getElementById("prev-btn");
const nextBtnEl = document.getElementById("next-btn");
const imgContainerEl = document.getElementById("img-container");
const showNavBtnEl = document.getElementById("show-nav");
const closeNavBtnEl = document.getElementById("close-nav");
const navEl = document.getElementById("nav");
const navLeftEl = document.getElementById("nav-left");
const quantityEl = document.getElementById("quantity");
const minusQuantityBtnEl = document.getElementById("minus-quantity-btn");
const plusQuantityBtnEl = document.getElementById("plus-quantity-btn");
const cartBtnEl = document.getElementById("cart-btn");
const cartImgEl = document.getElementById("cart-img");
const cartEl = document.getElementById("cart");
const addToCartBtnEl = document.getElementById("add-to-cart-btn");
const cartEmptyEl = document.getElementById("cart-empty");
const cartBadgeEl = document.getElementById("cart-badge");
const notificationContentEl = document.getElementById("notification-content");
const notificationEl = document.getElementById("notification");
const closeLightBoxBtnEl = document.getElementById("close-light-box-btn");
const lightBoxBtnEl = document.getElementById("light-box");
const lightBoxMainEl = document.getElementById("light-box-main-img");
const lightBoxPrevBtnEl = document.getElementById("light-box-prev-btn");
const lightBoxNextBtnEl = document.getElementById("light-box-next-btn");
let imgSliderEl = document.getElementById("img-slider");

let transform = 0;
let quantity = 0;
let totalQuantity = 0;
let imageNumber = 1;
let mc = new Hammer.Manager(imgSliderEl, {
  recognizers: [
    [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL, enable: true }],
  ],
});

const showNotification = (notificationContent) => {
  notificationContentEl.innerText = notificationContent;
  notificationEl.classList.add("notification-show");
  setTimeout(() => {
    notificationEl.classList.remove("notification-show");
  }, 1000);
};

const prevBtnElAction = () => {
  if (transform != 0) {
    transform = transform + 100;
    slideImg(transform);
  }
};

const nextBtnElAction = () => {
  if (transform != -300) {
    transform = transform - 100;
    slideImg(transform);
  }
};

prevBtnEl.addEventListener("click", prevBtnElAction);
nextBtnEl.addEventListener("click", nextBtnElAction);

const slideImg = (transform) => {
  imgContainerEl.style.transform = `translateX(${transform}%)`;
};

showNavBtnEl.addEventListener("click", () => {
  navEl.classList.toggle("show-nav");
});

navLeftEl.addEventListener("click", () => {
  navEl.classList.remove("show-nav");
});

closeNavBtnEl.addEventListener("click", () => {
  navEl.classList.remove("show-nav");
});

minusQuantityBtnEl.addEventListener("click", () => {
  if (quantity != 0) {
    quantity = quantity - 1;
  } else {
    showNotification("Quantity cannot be less than 0");
  }
  changeQuantity(quantity);
});

plusQuantityBtnEl.addEventListener("click", () => {
  if (quantity < 5) {
    quantity = quantity + 1;
  } else {
    showNotification("Quantity cannot be greater than 5");
  }
  changeQuantity(quantity);
});

const changeQuantity = (quantity) => {
  quantityEl.innerText = `${quantity}`;
};

cartBtnEl.addEventListener("click", (e) => {
  e.stopPropagation();
  cartEl.classList.toggle("show-cart");
  cartImgEl.classList.toggle("cart-active");
});

addToCartBtnEl.addEventListener("click", () => {
  console.log("total", totalQuantity);
  if (totalQuantity + quantity > 10) {
    showNotification("Total quantity should not be greater than 10");
    return;
  }
  if (quantity > 0) {
    try {
      document.getElementById("cart-container").remove();
    } catch {}
    totalQuantity = totalQuantity + quantity;
    cartEmptyEl.style.display = "none";
    let cartContainerEl = document.createElement("div");
    cartContainerEl.setAttribute("id", "cart-container");
    cartContainerEl.classList.add("cart-container");
    cartContainerEl.innerHTML = `
        <div class="cart-product">
          <div class="cart-left">
            <img class="cart-product-thumbnail" src="./images/image-product-1-thumbnail.jpg" alt="" />
            <div class="cart-product-detail">
              <p>Fall Limited Edition Sneakers</p>
              <p>$125.00 x ${totalQuantity} <b>$${
      125 * totalQuantity
    }.00</b></p>
            </div>
          </div>
          <button onclick=deleteFromCart()><img src="./images/icon-delete.svg" alt="" width="14" height="16" /></button>
        </div>
        <button class="primary-btn cart-checkout-btn" onclick=checkout()>Checkout</button>
    `;
    cartEl.append(cartContainerEl);
    cartBadgeEl.innerText = totalQuantity;
    cartBadgeEl.classList.add("cart-badge-show");
    showNotification("Add to cart successful");
  } else {
    showNotification("Quantity should be greater than 0");
  }
});

const emptyCart = () => {
  document.getElementById("cart-container").remove();
  cartEmptyEl.style.display = "flex";
  cartBadgeEl.classList.remove("cart-badge-show");
  totalQuantity = 0;
};

const deleteFromCart = () => {
  emptyCart();
  showNotification("Delete from cart successful");
};

const checkout = () => {
  emptyCart();
  showNotification("Checkout successful");
};

cartEl.addEventListener("click", (e) => {
  e.stopPropagation();
});

document.addEventListener("click", (e) => {
  if (cartEl.classList.contains("show-cart")) {
    cartEl.classList.remove("show-cart");
    cartImgEl.classList.remove("cart-active");
  }
});

const changeHighlightImage = (e) => {
  imageNumber = e.dataset.imageNumber;
  switch (imageNumber) {
    case "1":
      transform = 0;
      break;
    case "2":
      transform = -100;
      break;
    case "3":
      transform = -200;
      break;
    case "4":
      transform = -300;
      break;
    default:
      break;
  }
  slideImg(transform);
  setThumbnailActive(e);
};

const setThumbnailActive = (e) => {
  let thumbNailsEl = document.querySelectorAll(".img-thumbnail-btn");
  Array.from(thumbNailsEl).map((thumbNailEl) => {
    thumbNailEl.classList.remove("active");
  });
  e.classList.add("active");
};

const setLightBoxThumbnailActive = (e) => {
  let lightBoxThumbnailsEl = document.querySelectorAll(
    ".light-box-img-thumbnail-btn"
  );
  Array.from(lightBoxThumbnailsEl).map((lightBoxThumbnailEl) => {
    lightBoxThumbnailEl.classList.remove("active");
  });
  e.classList.add("active");
};

imgContainerEl.addEventListener("click", (e) => {
  lightBoxBtnEl.classList.add("show-light-box");
  lightBoxMainEl.setAttribute("src", e.target.getAttribute("src"));
  lightBoxMainEl.setAttribute("data-image-number", imageNumber);
  setLightBoxThumbnailActive(
    Array.from(document.querySelectorAll(".light-box-img-thumbnail-btn"))[
      Number(imageNumber) - 1
    ]
  );
});

closeLightBoxBtnEl.addEventListener("click", () => {
  lightBoxBtnEl.classList.remove("show-light-box");
  changeHighlightImage(lightBoxMainEl);
  setThumbnailActive(
    Array.from(document.querySelectorAll(".img-thumbnail-btn"))[
      Number(imageNumber) - 1
    ]
  );
});

setThumbnailActive(
  Array.from(document.querySelectorAll(".img-thumbnail-btn"))[0]
);

const showprevImage = (e) => {
  let currentImageNumber = Number(lightBoxMainEl.dataset.imageNumber);
  if (currentImageNumber > 1) {
    currentImageNumber -= 1;
    lightBoxMainEl.setAttribute(
      "src",
      `./images/image-product-${currentImageNumber}.jpg`
    );
    lightBoxMainEl.setAttribute("data-image-number", currentImageNumber);
    imageNumber = currentImageNumber;
    setLightBoxThumbnailActive(
      Array.from(document.querySelectorAll(".light-box-img-thumbnail-btn"))[
        Number(imageNumber) - 1
      ]
    );
  }
};
const shownextImage = (e) => {
  let currentImageNumber = Number(lightBoxMainEl.dataset.imageNumber);
  if (currentImageNumber < 4) {
    currentImageNumber += 1;
    lightBoxMainEl.setAttribute(
      "src",
      `./images/image-product-${currentImageNumber}.jpg`
    );
    lightBoxMainEl.setAttribute("data-image-number", currentImageNumber);
    imageNumber = currentImageNumber;
    setLightBoxThumbnailActive(
      Array.from(document.querySelectorAll(".light-box-img-thumbnail-btn"))[
        Number(imageNumber) - 1
      ]
    );
  }
};

const setImage = (e) => {
  imageNumber = Number(e.dataset.imageNumber);
  lightBoxMainEl.setAttribute(
    "src",
    `./images/image-product-${imageNumber}.jpg`
  );
  lightBoxMainEl.setAttribute("data-image-number", imageNumber);
  setLightBoxThumbnailActive(
    Array.from(document.querySelectorAll(".light-box-img-thumbnail-btn"))[
      Number(imageNumber) - 1
    ]
  );
};

let widthMatch = window.matchMedia("(min-width: 53.75rem)");
widthMatch.addEventListener("change", function (e) {
  if (e.matches) {
    if (transform == 0) {
      imageNumber = 0;
    } else if (transform == -100) {
      imageNumber = 1;
    } else if (transform == -200) {
      imageNumber = 2;
    } else if (transform == -300) {
      imageNumber = 3;
    } else {
    }
    setThumbnailActive(
      Array.from(document.querySelectorAll(".img-thumbnail-btn"))[imageNumber]
    );
    lightBoxBtnEl.classList.remove("show-light-box");
    disableSwipeEvents();
  } else {
    enableSwipeEvents();
  }
});

const enableSwipeEvents = () => {
  mc.on("swipeleft", function (ev) {
    nextBtnElAction();
  });
  mc.on("swiperight", function (ev) {
    prevBtnElAction();
  });
};
const disableSwipeEvents = () => {
  mc.off("swipeleft", function (ev) {});
  mc.off("swiperight", function (ev) {});
};
enableSwipeEvents();
