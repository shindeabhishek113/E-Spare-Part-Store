import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import swal from "sweetalert";



function ProductList() {

    const [allProductList, setallProductList] = useState([]);
    const [cart, setcart] = useState([]);


    useEffect(() => {
     let cust = JSON.parse(sessionStorage.getItem("user"));

      axios.get("http://localhost:8080/supplierproducts" , { headers: { "Authorization": `Bearer ${cust.jwt}` } })
      .then(response =>{
          console.log(response.data);
          setallProductList(response.data); 
      

      })
      .catch(err =>{
        console.log(err);
        swal("Something went Wrong", "", "error");
      })
  
      //to load the cart
      let customer = JSON.parse(sessionStorage.getItem("user"));
      console.log("custid: " + customer.id)
      axios.get("http://localhost:8080/myorder/cart/" + customer.id , { headers: { "Authorization": `Bearer ${customer.jwt}` } })
        .then(response => {
          console.log(response.data);
          setcart(response.data);
          sessionStorage.setItem("cart", JSON.stringify(response.data))
  
        })
        .catch(err => {
          console.log(err);
        })
  
    },[]);

    


    const addtocart = (c) => {
      let cart = JSON.parse(sessionStorage.getItem("cart"));

      console.log("supplier prodect: "+c);

      const obj = {
        "quantity": 1, 
        //"price": 101, 
        "myorder": cart, 
        "supplierProduct": c

      }

      axios.post("http://localhost:8080/itemdetails", obj)
      .then(response => {
        console.log("this responce of post: "+response.data)
        
        swal("Product added to cart successfully............")

      })
      .catch(err => {console.log(err)
      
        swal("Failed to add Product...")

      });
        
      }


  return (
    <div>
       <table class="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Product Name</th>
      <th scope="col">Description</th>
      <th scope="col">Weight</th>
      <th scope="col">Rating</th>
      <th scope="col">Part Number</th>
      <th scope="col">Price</th>
      <th scope="col">Discount</th>
      <th scope="col">Final Price</th>
      <th scope="col">Quantity</th>
    </tr>
  </thead>

  {
    allProductList.map((c) => {
      let v=c.products;

      return(
        <tbody>
        <tr>
        <th scope="row">{c.id}</th>
        <td>{v.productName}</td>
        <td>{v.description}</td>
        <td>{v.weight}</td>
        <td>{v.rating}</td>
        <td>{v.partNumber}</td>
        <td>{c.price}</td>
        <td>{c.discount}</td>
        <td>{c.finalPrice}</td>
        <td>{c.quantity}</td>

        <td><button type="button" class="btn btn-primary" onClick={() => addtocart(c)}>Add to Cart</button></td>
        </tr> 

    
        </tbody>
        )
    })
      
  }

   
  
</table>
    </div>
  )
}

export default ProductList
