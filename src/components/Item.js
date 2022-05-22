import React from "react";
//destructuring onUpdateItem & onDelete propS
function Item({ item, onUpdateItem, onDeleteItem }) {
  //adding an event handler for clicks on the button
  function handleAddToCartClick() {
    // console.log("clicked item", item);
    //include the item's ID in the URL so that our server knows which item we're trying to update
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
      .then((r) => r.json())
      .then((updatedItem) => onUpdateItem(updatedItem));
  }

  function handleDeleteClick(){
    // console.log(item);
    ///We only need the method option — no body or headers are needed since we don't have any additional data to send besides the ID
    fetch(`http://localhost:4000/items/${item.id}`, { method: "DELETE" })
      .then((r) => r.json())
      .then(() => onDeleteItem(item)); //passing the deleted item
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"}
      onClick={handleAddToCartClick} //ading the onClick listener
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;
