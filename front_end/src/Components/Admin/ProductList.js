import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom';



function ProductList() {
 // const navigate = useNavigate();

    const [allProductList, setallProductList] = useState([]);
   // const [cart, setcart] = useState([]);


    useEffect(() => {
     let cust = JSON.parse(sessionStorage.getItem("user"));

      axios.get("http://localhost:8080/products/view")
      .then(response =>{
          console.log(response.data);
          setallProductList(response.data); 
      

      })
      .catch(err =>{
        console.log(err);
        swal("Something went Wrong", "", "error");
      })
  
      
    },[]);

    const [data, setData] = useState({
      productName: "",
      description: "",
      weight: "",
      rating:"",
      partNumber: "",
      id:"",
      
     // categoryName: "",
      
      
    });
  
    const changeHandler = (e) => {
      setData((data) => ({
        ...data,
        [e.target.name]: e.target.value
      }));
      console.log(e.target.value)
    }
  
  
      const submitData = () => {
  
  
  
          const obj = {
            "productName": data.productName,
            "description": data.description ,"weight": data.weight, 
            //"categoryName": data.categoryName
            "rating":data.rating,
            "partNumber": data.partNumber,
            "productCategory":{"id":data.id}
            
          }
            
          axios.post("http://localhost:8080/products/addproduct", obj)
                .then(response => {
                  console.log("Product Added Suucessfully");
  
                  swal("Product added  successfully............")
                  window.location.reload();
                 
                })
                .catch(err => {console.log(err)
                  swal("Failed to add Product...")
              });
          
        }

    
    


    


  return (

    <div>

<form className = "card col-md-6 offset-md-3 offset-md-3">
      
      <div className="form-group">
        <label htmlFor="productName">Product Name</label>
        <input type="text" name="productName" value={data.productName} onChange={changeHandler} className="form-control" id="productName"/>
      </div>

      

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input type="text" name="description" value={data.description} onChange={changeHandler} className="form-control" id="description"/>
      </div>

      <div className="form-group">
        <label htmlFor="weight">Weight</label>
        <input type="number" name="weight" value={data.weight} onChange={changeHandler} className="form-control" id="weight"/>
      </div>

      {/* <div className="form-group">
        <label htmlFor="categoryName">Category Name</label>
        <input type="text" name="categoryName" value={data.categoryName} onChange={changeHandler} className="form-control" id="categoryName"/>
      </div> */}

      <div className="form-group">
        <label htmlFor="rating">Rating</label>
        <input type="number" name="rating" value={data.rating} onChange={changeHandler} className="form-control" id="rating"/>
      </div>

      <div className="form-group">
        <label htmlFor="partNumber">Part Number</label>
        <input type="number" name="partNumber" value={data.partNumber} onChange={changeHandler} className="form-control" id="partNumber" />
      </div>

      <div className="form-group">
        <label htmlFor="id">Category Id</label>
        <input type="number" name="id" value={data.id} onChange={changeHandler} className="form-control" id="id"/>
      </div>


        <button type="button" className="btn btn-primary" onClick={submitData}>Add New Product</button>

        <div className="dropdown-divider"></div>


    </form>
      {/* <button type="button" class="btn btn-primary" onClick={addNewProduct()}>Add Product</button> */}
       <table class="table">
  <thead>
  
    <tr>
      {/* <th scope="col">Category Name</th> */}
      
      <th scope="col">Id</th>
      <th scope="col">Category Name</th>
      <th scope="col">Product Name</th>
      <th scope="col">Description</th>
      <th scope="col">Weight</th>
      <th scope="col">Part Number</th>
      
      
    </tr>
  </thead>

  {
    allProductList.map((c) => {
      let v=c.productCategory;

      return(
        <tbody>
        <tr>
        <th scope="row">{c.id}</th>
        {/* <td>{v.categoryName}</td> */}
        <td>{v.categoryName}</td>
        <td>{c.productName}</td>
        <td>{c.description}</td>
        <td>{c.weight}</td>
        <td>{c.partNumber}</td>
        


        <td><button type="button" class="btn btn-primary" >Update</button></td>
        <td><button type="button" class="btn btn-primary" >Delete</button></td>
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
