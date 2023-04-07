import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function Customer_navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">


          <li className="nav-item"><Link className="nav-link" to="/home">E-Spare Store</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/customer">Customer</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/customer/cart">Cart</Link></li>


          <li className="nav-item">
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">Orders</Dropdown.Toggle>
              <Dropdown.Menu>
                <Link className="nav-link" to="/customer/myorders">Current</Link>
                <Link className="nav-link" to="/customer/myorderhistory">History</Link>
              </Dropdown.Menu>
            </Dropdown>
          </li>


          <li className="nav-item">
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">Profile</Dropdown.Toggle>
              <Dropdown.Menu>
                <Link className="nav-link" to="/update">Update</Link>
                <Link className="nav-link" to="/signout">Sign Out</Link>
              </Dropdown.Menu>
            </Dropdown>
          </li>

          {/* <li className="nav-item" >
        

          </li> */}

          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}

        </ul>
      </div>
    </nav>
  )
}

export default Customer_navbar