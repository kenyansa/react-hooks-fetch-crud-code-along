import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      // .then((items)=>console.log(items)); //to see the array of objects in our shopping list
      .then((items) => setItems(items)); //items state replaces empty array with the new array from the server
  }, []);
  //adding a callback function:
  function handleUpdateItem(updatedItem){
    // console.log("In ShoppingCart:", updatedItem);
    const updatedItems = items.map((item)=>{
      if(item.id === updatedItem.id){
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);

  }

  //adding a handleAddItem function and passing a reference to it as a prop called onAddItem to the ItemForm
  function handleAddItem(newItem){
    // console.log("In ShoppingList.", newItem);
    setItems([...items, newItem]); //Now each time a user submits the form, a new item will be added to our database and will also be added to our client-side state, so that the user will immediately see their item in the list.
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  function handleDeleteItem(deleteItem){
    // console.log("In SHoppingCart:", deleteItem);
    const updatedItems = items.filter((item)=>item.id !== deleteItem.id);
    setItems(updatedItems);
  }
  return (
    <div className="ShoppingList">
      {/* adding onAddItem prop */}
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem}/> //paasing onUpdateItem as a prop to Item
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
