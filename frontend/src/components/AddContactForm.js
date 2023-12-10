import { useEffect, useState } from "react";
import React from 'react';
import { Link } from 'react-router-dom';
import {FaRegAddressBook} from "react-icons/fa";
import { FaPhoneAlt } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import '../index.css';

   
   
   export default function AddContactForm(){
    	   
    let dataObj = [];
	
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
	const [id, setId] = useState("")
	const [message, setMessage] = useState("")
	const [resultset, setResultset] = useState("")
	const [lastname, setLastname] = useState("")
	const [query, setQuery] = useState("")

    interface FormDataType {firstName:string, lastName: string, phoneNumber: string, lastname: string, id: string}
    const responseBody: FormDataType = {firstName: "", lastName: "", phoneNumber: "", lastname: "", id: ""}
      
	    
       const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
		try {
	    //responseBody.id = document.getElementById("id").value;		
		responseBody.firstName = firstName
        responseBody.lastName = lastName
        responseBody.phoneNumber = phoneNumber
        //console.log(JSON.stringify(responseBody))
      const res = await fetch("http://localhost:9001/createContact", {
        method: "POST",
		headers: {
        accept: "application/json",
		'content-type': "application/json",
		
      },
	  
        body: JSON.stringify(responseBody),
		
      });
      if (res.status === 200) {
		setMessage("Contact saved successfully");
      } else {
        setMessage("Failed to save contact");
      }
    } catch (err) {
      console.log(err);
    }
        
  
}


const onSubmitHandler2 = async (event: React.FormEvent<HTMLFormElement>) => {
	     event.preventDefault();
        //if(event === 'Enter' )
		//{ 
		try {
        responseBody.lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1).toLowerCase()
        //console.log(JSON.stringify(responseBody))
      const res = await fetch("http://localhost:9001/findAll", {
        method: "POST",
		headers: {
        accept: "application/json",
		'content-type': "application/json",
		
      },
	  
        body: JSON.stringify(responseBody),
		
      });
	  
	  
      if (res.status === 200) {
		  const dataObj = await res.json();
		  let jsonObj = JSON.stringify(dataObj);
		  console.log(`jsonObj: ${jsonObj}`);
		  console.log(dataObj[0]);
		  
		  
		document.getElementById("first_name").value=dataObj[0].firstName;
		document.getElementById("last_name").value=dataObj[0].lastName;
		document.getElementById("phone_number").value=dataObj[0].phoneNumber;
		document.getElementById("id").value=dataObj[0]._id;
		setFirstName(firstName);
		setLastName(lastName);
		setPhoneNumber(phoneNumber);
		setId(id);
		setMessage("Data fetched successfully");
		
	    setResultset(
     (<div>{ dataObj.filter(p => {
            if (query === '') {
            return p;
            } else if (p.lastName.toLowerCase().includes(query.toLowerCase())) {
            return p;
            }
            }).map((p, index) => (
           <div className="card" key={index}>
           <p>{`${p.firstName} ${p.lastName}`}<br /><FaPhoneAlt style={{background: 'white', color: 'gray', fontSize:'15px'}} />{` ${p.phoneNumber}`}</p>
		   <p><FaTrashAlt size={30} style={{background: 'red', color: 'white'}} /></p>
           </div>
            ))
}</div>));
      } else {
        setMessage("Failed to fetch data");
      }
    } catch (err) {
      console.log(err);
    }
	
		//}
     //else{setMessage("Failed to fetch data...");
	 //}		
}

const onSubmitHandler3 = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
		try {
		responseBody.id = document.getElementById("id").value
		responseBody.firstName = firstName
        responseBody.lastName = lastName
        responseBody.phoneNumber = phoneNumber
		setFirstName(firstName);
		setLastName(lastName);
		setPhoneNumber(phoneNumber);
		setId(id);

        console.log(JSON.stringify(responseBody))
      const res = await fetch("http://localhost:9001/updateContact", {
        method: "PUT",
		headers: {
        accept: "application/json",
		'content-type': "application/json",
		
      },
	  
        body: JSON.stringify(responseBody),
		
      });
	  
	  
      if (res.status === 200) {
		   const dataObj = await res.json();
		  console.log(dataObj);
		setMessage("Data updated successfully");
      } else {
        setMessage("Failed to update data");
      }
    } catch (err) {
      console.log(err);
    }
	
          
}

const onSubmitHandler4 = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
		try {
		responseBody.id = id
		setId(id);

        console.log(JSON.stringify(responseBody))
      const res = await fetch("http://localhost:9001/deleteContact", {
        method: "DELETE",
		headers: {
        accept: "application/json",
		'content-type': "application/json",
		
      },
	  
        body: JSON.stringify(responseBody),
		
      });
	  
	  
      if (res.status === 200) {
		  const data = await res.json();
		  const dataObj = JSON.stringify(data);
		  const  dataOb = JSON.parse(dataObj);
		  console.log(data);
		  console.log(dataOb);
		setMessage("Data deleted successfully");
      } else {
        setMessage("Failed to delete data");
      }
    } catch (err) {
      console.log(err);
    }
	
          
}

    const inputChangeHandler = (setFunction: React.Dispatch<React.SetStateAction<string>>, event: React.ChangeEvent<HTMLInputElement>) => {
        setFunction(event.target.value);
	
    }
	
    return(
	<div align="center">
        <div className="flex-container" ><form id="form" >
		    <input id="lastname" onChange={(e)=>inputChangeHandler(setLastname, e)} type="text" placeholder="&#xF002; Search for contacts by last name..." name="lastname" style={{fontFamily: 'FontAwesome' , width: '660px', height: '28px' }} onSubmit={onSubmitHandler2}/><button id="search" style={{borderRadius:'15px', background: 'grey', color: 'white', fontSize:'20px', width: '120px', height: '30px'}} type="button" onClick={onSubmitHandler2}>Search</button>
			<div>{resultset ? <p>{resultset}</p> : null}</div>
			<div>{		
	   async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
		try {
        responseBody.lastname = lastname
      const res = await fetch("http://localhost:9000/findall", {
        method: "POST",
		headers: {
        accept: "application/json",
		'content-type': "application/json",
		
      },
	  
        body: JSON.stringify(responseBody),
		
      });
	  
	  
      if (res.status === 200) {
		  const dataObj = await res.json();
		   console.log(dataObj);
	      dataObj.filter(p => {
    if (query === '') {
      return p;
    } else if (p.lastName.toLowerCase().includes(query.toLowerCase())) {
      return p;
    }
  }).map((p, index) => (
    <div className="card" key={index}>
      <p>{`${p.firstName} ${p.lastName}`}</p>
    </div>
  ))
  
		document.getElementById("first_name").value=dataObj.firstName;
		document.getElementById("last_name").value=dataObj.lastName;
		document.getElementById("phone_number").value=dataObj.phoneNumber;
		setFirstName(firstName);
		setFirstName(lastName);
		setFirstName(phoneNumber);
		
		setMessage("Data fetched successfully");
      } else {
        setMessage("Failed to fetch data");
      }
    } catch (err) {
      console.log(err);
    }
            
          
			}}</div>
            <div><tr><td><label htmlFor="first_name">First Name: </label></td>
            <td><input id="first_name" onChange={(e)=>inputChangeHandler(setFirstName, e)} type="text"/></td></tr></div>
            <div><tr><td><label htmlFor="last_name">Last Name: </label></td>
            <td><input id="last_name" onChange={(e)=>inputChangeHandler(setLastName, e)} type="text"/></td></tr></div>
            <div><tr><td><label htmlFor="phone_number">Phone No.:    </label></td>
            <td><input id="phone_number" onChange={(e)=>inputChangeHandler(setPhoneNumber, e)} type="text"/></td></tr></div>
			<div><tr><td><label htmlFor="id">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID:</label></td>
            <td><input id="id" onChange={(e)=>inputChangeHandler(setId, e)} type="text"/></td></tr></div>
			<div><button id="save" style={{borderRadius:'15px', background: 'grey', color: 'white', fontSize:'20px', width: '120px', height: '30px'}} type="button" onClick={onSubmitHandler}>Save</button><button id="update" style={{borderRadius:'15px', background: 'grey', color: 'white', fontSize:'20px', width: '120px', height: '30px'}} type="button" onClick={onSubmitHandler3}>Update</button><button id="delete" style={{borderRadius:'15px', background: 'grey', color: 'white', fontSize:'20px', width: '120px', height: '30px'}} type="button" onClick={onSubmitHandler4}>Delete</button></div>
			<div>{message ? <p>{message}</p> : null}</div>
       </form></div>
		
		
		</div>
    )
	
	
	useEffect(() => {
  onSubmitHandler2();
}, []);

   useEffect(() => {
  onSubmitHandler();
}, []);


}


