import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default class registerUser extends Component {
//Intial state for 
    constructor(props) {
        super(props);
        this.state ={
            firstname: '',
            lastname: '',
            username: '',
            password:'',
            address: '',
            phoneNumber:'',
            emailId: '',
            gender: '',
            maritalStatus:'',
            incomeRange: '',
            pet: '',

        }
    }
}
//Fetching the Values on the Change of set
onChangeFirstname = e => {
    this.setState({ firstname: e.target.value });
}
onChangeLastname = e => {
    this.setState({ lastname: e.target.value });
}
onChangePassword = e => {
    this.setState({ password: e.target.value });
}
onChangeAddress = e => {
    this.setState({ address: e.target.value });
}
onChangeEmailId = e => {
    this.setState({ emailId: e.target.value });
}
onChangeGender = e => {
    this.setState({ gender: e.target.value });
}
onChangeMaritalStatus = e => {
    this.setState({ maritalStatus: e.target.value });
}
onChangeIncomeRange = e => {
    this.setState({ incomeRange: e.target.value });
}
onChangePet = e => {
    this.setState({ pet: e.target.value });
}

onSubmit = e => {
    e.preventDefault();

    /**
     * Creating a new To-do and pushing it to backend
     */
    console.log('Form submitted:');
    console.log(`User Firstname: ${this.state.firstname}`);
    console.log(`User Lastname: ${this.state.lastname}`);
    console.log(`Use username: ${this.state.username}`);

    const newUser = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        username: this.state.username,
        password: this.state.password,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        emailId: this.state.emailId,
        gender: this.state.gender,
        maritalStatus: this.state.maritalStatus,
        incomeRange: this.state.incomeRange,
        pet: this.state.pet,

    }
    /**
     * Post Call to the backend
     */
    fetch('http://localhost:5000/register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(newUser)
    })
        .then(response => response.json())
        .then( res => console.log(res.data));
    
    alert("Successfully added a user");
    //Default Value for Status should be pending
    this.setState({
        firstname: '',
            lastname: '',
            username: '',
            password:'',
            address: '',
            phoneNumber:'',
            emailId: '',
            gender: '',
            maritalStatus:'',
            incomeRange: '',
            pet: '',
    })
}

