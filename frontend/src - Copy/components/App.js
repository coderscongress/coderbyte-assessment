
import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {FaRegAddressBook} from "react-icons/fa";
import AddContactForm,{HandleSearch} from "./AddContactForm";
import "./App.css";
import '../index.css';


/*FaRegTrashAlt FaTrashAlt   FaRegUser   FaRegAddressBook  FaUserPlus  FaUser  FaUserTie  FaUsers*/

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
		this.handleAddContactClick = this.handleAddContactClick.bind(this);
    }
	
	handleAddContactClick(event) {
	const root2 = ReactDOM.createRoot(document.getElementById('root2'));
	root2.render(
  <React.StrictMode>
    <div>
	<AddContactForm />
    </div>
  </React.StrictMode>
	);
     }

    
    render() {
        return (
             
                   
				   <form id="form">
				   <div className="flex-container"><h1 style={{color: 'black', fontSize:'40px'}}><FaRegAddressBook style={{background: 'black', color: 'white', fontSize:'40px'}} />Phone Book App </h1></div>
	<p className="flex-container"><h1 style={{ color: 'black', fontSize:'40px'}}>Contacts</h1><button id="add-contact" style={{borderRadius:'5px', background: 'blue', color: 'white', fontSize:'20px', width: '180px', height: '44px'}} type="button" onClick={this.handleAddContactClick}>+Add Contact</button></p>
		           </form>
				   
				   
                
                
            
        );
    }
}

export default App;