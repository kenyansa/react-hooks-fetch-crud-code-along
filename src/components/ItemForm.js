import React, { useState } from "react";

function ItemForm({onAddItem}) { //destructuring the onAddItem prop
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  //handling submissions
  function handleSubmit (e){
    e.preventDefault();
    const itemData ={
      name: name,
      category: category,
      isInCart: false,
    };
    fetch("http://localhost:4000/items",{method: "POST", headers: {"Content-ype" : "application/json"},
      body: JSON.stringify(itemData),
    })
    .then((r)=>r.json())
    //we'll call the onAddItem prop with the newItem
    .then((newItem)=>onAddItem("Success", newItem));
  }

  return (
    //setting up the form to call handleSubmit when the form is submitted
    <form className="NewItem" onSubmit={handleSubmit} >
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
