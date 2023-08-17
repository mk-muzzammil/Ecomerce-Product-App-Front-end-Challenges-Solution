const cartShowContainerEle=document.querySelector(".cartShowContainer");
const cartIcon=document.querySelector("#cartIcon");
const arrows=document.querySelectorAll(".ArrowButton");
const arrowsLightBox=document.querySelectorAll(".popUpMenuButton");
const mainImageContainer=document.getElementById("image-Container");
const imageContainerPopUp=document.getElementById("image-Container-pop-Up");
const thumbnailImgLits=Array.from(document.querySelectorAll(".image-container"));
const thumnailimagesLightBox=Array.from(document.querySelectorAll(".image-Container-pop-Up-Menu"));
const addtocartButton=document.querySelector("#addToCart");
const cartInput=document.querySelector("#quantityInput");
const cartInputButtons=document.querySelectorAll(".cartInputButton");
const errorText=document.querySelector("#errorText");
const inputContainer=document.querySelector(".inputContainer");
const checkoutButton=document.querySelector(".checkoutButton");
const cartContainerBody=document.querySelector(".cartContainerBody");
const cartLabelTag=document.querySelector(".cartLabelTag");
const deleteIcon=document.querySelector(".deleteIcon");
const closeIcon=document.querySelector("#closeIcon");
const mainPopUpContainer=document.querySelector(".mainPopUpContainer");
// const showDrower=document.querySelector(".showDrower");
const barIcon=document.querySelector("#barIcon");
const DrowerContainer=document.querySelector(".DrowerContainer");
const closeIconDrower=document.querySelector("#closeIconDrower");
const images=[
  "images/image-product-1.jpg",
  "images/image-product-2.jpg",
  "images/image-product-3.jpg",
  "images/image-product-4.jpg"];
  let currentIndex=0;
  let amountval=0;

// console.log(arrows[0].id);


const clearAllthumbnailOpacity=()=>{
  thumbnailImgLits.forEach(image =>{
    image.classList.remove("onClickOpacity");
  })
  thumnailimagesLightBox.forEach(image =>{
    image.classList.remove("onClickOpacity");
  })
}
const mobileArrowsSliding=(event)=>{
  const arrow=event.currentTarget;
  // =========1st approach by jugar ========
  // if (arrow.id === "prevArrow") {
  //   console.log("Prev Arrow");
  //   if (currentIndex === 0) {
  //     currentIndex = 3;
  //   } else {
  //     currentIndex--;
  //   }
  //   mainImageContainer.setAttribute("src", images[currentIndex]);
  // } else {
  //   console.log("Next Arrow");
  //   if (currentIndex === 3) {
  //     currentIndex = 0;
  //   } else {
  //     currentIndex++;
  //   }
  //   mainImageContainer.setAttribute("src", images[currentIndex]);
  // }
  // =========2nd approach by Formula ========

  if (arrow.id === "prevArrow") {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  } 
  else {
    currentIndex = (currentIndex + 1) % images.length;
  }

  mainImageContainer.setAttribute("src", images[currentIndex]);

}

const popUpContainerArrowSliding=(event)=>{
  const targettedArrow=event.currentTarget;
  if (targettedArrow.id === "nextPopUpArrow") {
    currentIndex = (currentIndex + 1) % images.length;
  } 
  else {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }

  imageContainerPopUp.setAttribute("src", images[currentIndex]);


}
const showThumbnailImage=(event)=>{
  clearAllthumbnailOpacity();
  const targettedThumbnail=event.currentTarget;
  const id=+targettedThumbnail.id
  if(!targettedThumbnail.classList.contains("onClickOpacity")){
    targettedThumbnail.classList.add("onClickOpacity");
  }
  
  mainImageContainer.setAttribute("src",images[id]);

}
const showThumbnailImageOnPopUp=(event)=>{
  clearAllthumbnailOpacity();
  const targettedThumbnail=event.currentTarget;
  const id=+targettedThumbnail.id
  if(!targettedThumbnail.classList.contains("onClickOpacity")){
    targettedThumbnail.classList.add("onClickOpacity");
  }
  
  imageContainerPopUp.setAttribute("src",images[id]);

}

function MakingCartItemCard(itemAmount,totalAmount){
  return `<div class="cartItem">
  <div class="imageContentContainer">
    <img src="images/image-product-2.jpg" alt="Product">
  
  <div class="contentContainerCardItem">
    <span id="descriptionItem">Fall Limited Edition Sneakers</span>
    
    <span id="prizeQuantitySpan">$125.00 x ${itemAmount} <span id="boldPriceSpan">$ ${totalAmount}.00</span><img class="deleteIcon" src="images/icon-delete.svg" alt="Delete"></span>

    
  </div>

  </div>
  
  

</div>`
}
function validateNumber(num){
  if (!isNaN(num)) {
    errorText.style.display="none";
    inputContainer.style.border ="none";
    return num;
  }
  else{
    inputContainer.style.border ="2px solid red";
    errorText.style.display="block";
    return -1;
  }


}
const incrementDecrementAction=(event)=>{
  const targettedbutton=event.currentTarget;
  amountval=validateNumber(parseInt(cartInput.value));
  
  if(amountval!=0){
    if (targettedbutton.id === "minusButton") {
      amountval = Math.max(0, amountval - 1);
    }
     else {
      amountval = Math.min(999, amountval + 1);
    }
    cartInput.value=amountval.toString();
  }
  else if(amountval == 0){
    if (targettedbutton.id === "minusButton") {
      amountval = Math.max(0, amountval - 1);
    }
     else {
      amountval =1;
    }
    cartInput.value=amountval.toString();

  }
  else{
    inputContainer.style.border ="2px solid red";
    errorText.style.display="block";
  }
  
    

}

cartIcon.addEventListener("click",()=>{
  console.log("Hello");
  cartShowContainerEle.classList.toggle("showCart");

})

const AddEventListeneresToArrows=()=>{
  arrows.forEach(arrow =>{
    arrow.addEventListener("click",mobileArrowsSliding);
  })
  arrowsLightBox.forEach(arrow=>{
    arrow.addEventListener("click",popUpContainerArrowSliding);
  })
}
const addEventListenersToThumbnailImages=()=>{
  thumbnailImgLits.forEach(thumbnailImage =>{
    thumbnailImage.addEventListener("click",showThumbnailImage);

  })
  thumnailimagesLightBox.forEach(image =>{
    image.addEventListener("click",showThumbnailImageOnPopUp);

  })

}

const addEventListenerToINputButtons=()=>{
  cartInputButtons.forEach(button =>{
    button.addEventListener("click",incrementDecrementAction)
  })
}


function attachDeleteIconListeners() {
  const deleteIcons = document.querySelectorAll(".deleteIcon");
  deleteIcons.forEach((deleteIcon) => {
    deleteIcon.addEventListener("click", () => {
      // Get the parent element (card) of the clicked delete icon
      const cardElement = deleteIcon.closest(".cartItem");
      if (cardElement) {
        // Remove the card from the container
        cartContainerBody.removeChild(cardElement);
        checkoutButton.classList.remove("showCheckoutButton");
        cartLabelTag.classList.remove("showCartAmounLabel");
        cartContainerBody.innerHTML="Your Cart is empty";

      }
    });
  });
}



addtocartButton.addEventListener("click",()=>{
  amountval=validateNumber(parseFloat(cartInput.value));

  if(amountval != -1){
    const card=MakingCartItemCard(amountval,Math.round(125.00 * amountval));

    cartContainerBody.innerHTML=card;
    cartLabelTag.innerHTML=amountval;

    checkoutButton.classList.add("showCheckoutButton");
    cartLabelTag.classList.add("showCartAmounLabel");

    attachDeleteIconListeners();
    // cartContainerBody.addEventListener("click", (event) => {
    //   if (event.target.classList.contains("deleteIcon")) {
        
    //   }
    // });
    
  
  }
  else{
    inputContainer.style.border ="2px solid red";
    errorText.style.display="block";

  }

})
mainImageContainer.addEventListener("click",()=>{
  mainPopUpContainer.classList.add("showMainPopUpMenu");
  
})

closeIcon.addEventListener("click",()=>{
  mainPopUpContainer.classList.remove("showMainPopUpMenu");
})

barIcon.addEventListener("click",()=>{
  DrowerContainer.classList.add("showDrower");
})
closeIconDrower.addEventListener("click",()=>{
  DrowerContainer.classList.remove("showDrower");
})





AddEventListeneresToArrows();
addEventListenersToThumbnailImages();
addEventListenerToINputButtons();
