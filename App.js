//Using a code tempelate from Elearn week 11 "React router demo"

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import pet from './pet.jpg';
import petstorelogo from './petstorelogo.jpg';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';




class About extends React.Component 
{  
  render () 
  {      
    return ( 
	<div id = "about">
	<h1>About</h1>
	<img src={pet}></img>
	<p>A Pet store management system for mantaining a data regarding all pets items in store in which one can add , edit , search and delete a data.</p>
	<p>From toys and accessories to pet food and medication, manual stock counts are tedious and leave room for human error. </p>
	<p>Our POS simplifies inventory management so you can stay on top of what’s selling and what’s still on the shelves. </p>
	<br></br>
	</div>
	);
  }    
};



class Edit extends React.Component 
{  
  render () 
  {      
    return ( <p>Some Edit content</p> );
  }    
};

class Inventory extends React.Component 
{
	
	constructor(props) {
    super(props);
    this.state = { inventory : []
	
	};
  }
   // when the component mounts, make an AJAX request to the back end
  // get all of the pets in the inventory, save them to state variable 
  // inventory, then call the deleterOperation method
  componentDidMount() {	
      fetch("http://localhost:3001/api?act=getall")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
			inventory:result	
          });
		  //this.deleteOperation();
		  
        },
        (error) => {
          this.setState({
            inventory: "error making AJAX request"
          });
        }
    )
  }
  
  
 
  
 
  render ()
  {
	  
    return (
	<div id="centerTable">
	  <table id="inventoryTable"> 
		<tr>
		<th>Id</th>
		<th>Animal</th>
		<th>Description</th>
		<th>Age</th>
		<th>Price</th>
		</tr>
        {(this.state.inventory.map(Data =>
            <tr className="trow"> 
			<td> {Data.id}</td> 
			<td> {Data.animal} </td>
			<td> {Data.description} </td>
			<td> {Data.age} </td>
			<td> ${Data.price} </td>
            </tr>
			)) 
		}
      </table>

     
     
	  </div>
    )
  }
}





// We can get at the url parameter with this.props.match.params 
// followed by the url parameter name defined in the route.  
class Search extends React.Component 
{
	constructor(props) {
    super(props);
    this.state = { inventory : []
	
	}
	};
	
	componentDidMount() {	
      fetch("http://localhost:3001/api?act=getall")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
			inventory:result	
          });
		
		  
        },
        (error) => {
          this.setState({
            inventory: "error making AJAX request"
          });
        }
    )
  }
  render()
  {
    return ( 
	<div>
	<div id="inputsearch">
	<input id="search" type="text" name="search" placeholder="Search pets"/>
	</div>
	
	<div id = "search">
	
			 <table id="inventoryTable"> 
		<tr>
		<th>Id</th>
		<th>Animal</th>
		<th>Description</th>
		<th>Age</th>
		<th>Price</th>
		</tr>
        {(this.state.inventory.map(Data =>
            <tr className="trow"> 
			<td> {Data.id}</td> 
			<td> {Data.animal} </td>
			<td> {Data.description} </td>
			<td> {Data.age} </td>
			<td> {Data.price} </td>
            </tr>
			)) 
		}
      </table>

		 </div>
		 </div>);
  }
}


class App extends React.Component 
{
  render ()
  {
    return (

      <Router>
        <div id = "container">
		<header>
		<img src={petstorelogo}></img>
          <h1>Pet Store Management System</h1>
		  <nav>
          <ul>
            {
              // Our NavLinks create navigiation links that React Router 
              // will associate with our routes.  NavLinks will use the 
              // active css class to style themselves when they are the 
              // active link.  See the active css class in App.css.  We
              // need to use the exact property for our root/home path 
              // otherwise home will always be considered active.
            }
           
            <li><NavLink exact to="/">About</NavLink></li>
            <li><NavLink to="/Edit">Edit</NavLink></li>
            <li><NavLink to="/Inventory">Inventory</NavLink></li>
			<li><NavLink to="/Search">Search</NavLink></li>

          </ul>
	</nav>
          <hr/>
		  </header>
		  
  
          {
            // Render a different component depending on the path, "/" is the 
            // "no path" case.  We add the property exact to have it render 
            // only on exact matches, otherwise "/" would also match for 
            // things like "/about".
          } 
       
          <Route exact path="/" component={About}/>
          <Route path="/Edit" component={Edit}/>
		  <Route path="/Inventory" component={Inventory}/>
		  <Route path="/Search" component={Search}/>

          
          { 
            // A route with a url parameter in it, :someid after /urlparm 
          }
         

          {
            // We can have multiple components render in multiple areas by 
            // including multiple Route components.
          }
         
		
        </div>
		<div id="footer">
		<footer>Copyright 2019 Nirav Patel | All Rights Reserved<br/></footer>
		</div>
      </Router>
    );
  }
}

export default App;
