import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListErrors from '../errorHandler';

export default class registerUser extends Component {
    //Intial state for 
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            address: '',
            phoneNumber: '',
            emailId: '',
            gender: '',
            maritalStatus: '',
            incomeRange: '',
            pet: '',

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
    onChangeUsername = e => {
        this.setState({ username: e.target.value });
    }
    onChangePhoneNumber = e => {
        this.setState({ phoneNumber: e.target.value });
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
        fetch('http://localhost:5000/lacabana/login/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(response => response.json())
            .then(res => console.log(res.data));

        alert("Successfully added a user");

        this.setState({
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            address: '',
            phoneNumber: '',
            emailId: '',
            gender: '',
            maritalStatus: '',
            incomeRange: '',
            pet: '',
        })
    }
    render() {
        return (
            <div className="auth-page">
                <div className="container page">
                    <div className="row">

                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Sign Up</h1>
                            <p className="text-xs-center">
                                <Link to="/login">
                                    Have an account?
                                 </Link>
                            </p>

                            <ListErrors errors={this.props.errors} />

                            <form onSubmit={this.onSubmit}>
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            placeholder="Firstname"
                                            value={this.props.firstname}
                                            onChange={this.onChangeFirstname} />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            placeholder="Lastname"
                                            value={this.props.lastname}
                                            onChange={this.onChangeLastname} />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            placeholder="Username"
                                            value={this.props.username}
                                            onChange={this.onChangeUsername} />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control-lg"
                                            type="email"
                                            placeholder="Email"
                                            value={this.props.email}
                                            onChange={this.onChangeEmailId} />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control-lg"
                                            type="password"
                                            placeholder="Password"
                                            value={this.props.password}
                                            onChange={this.onChangePassword} />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            placeholder="Address"
                                            value={this.props.address}
                                            onChange={this.onChangeAddress} />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control-lg"
                                            type="number"
                                            placeholder="Phone Number"
                                            value={this.props.phoneNumber}
                                            onChange={this.onChangePhoneNumber} />
                                    </fieldset>
                                    <fieldset className="form-group">

                                        <label for="gender">Gender </label><br></br>
                                        <input type="radio" id="male" name="gender" value={this.props.gender} onChange={this.onChangeGender} />
                                        <label for="male">Male          </label><br></br>
                                        <input type="radio" id="female" name="gender" value={this.props.gender} onChange={this.onChangeGender} />
                                        <label for="female">Female      </label><br></br>
                                        <input type="radio" id="other" name="gender" value={this.props.gender} onChange={this.onChangeGender} />
                                        <label for="other">Other</label>
                                    </fieldset>
                                    <fieldset className="form-group">

                                        <label for="MaritalStatus"> Marital Status </label> <br></br>
                                        <input type="radio" id="married" name="Married" value={this.props.maritalStatus} onChange={this.onChangeMaritalStatus} />
                                        <label for="married">Married        </label><br></br>
                                        <input type="radio" id="single" name="Single" value={this.props.maritalStatus} onChange={this.onChangeMaritalStatus} />
                                        <label for="single">Single      </label>

                                    </fieldset>
                                    <fieldset className="form-group">

                                        <label for="Pet Status"> Do you own a Pet? </label> <br></br>
                                        <input type="radio" id="yes" name="Yes" value={this.props.pet} onChange={this.onChangePet} />
                                        <label for="yes">Yes        </label><br></br>
                                        <input type="radio" id="no" name="No" value={this.props.pet} onChange={this.onChangePet} />
                                        <label for="no">No      </label>

                                    </fieldset>
                                    <fieldset>
                                        <label for="incomeRange">Choose an Income Range:</label>
                                        <select id="income" name="incomeRange" form="incomeform">
                                            <option value="10,0000-50,0000 per annum">10,0000-50,0000 per annum</option>
                                            <option value="50,0000-100,0000 per annum">50,0000-100,0000 per annum</option>
                                            <option value="100,0000-150,0000 per annum">100,0000-150,0000 per annum</option>
                                            <option value="150,0000 above">150,0000 above</option>
                                        </select>
                                    </fieldset>

                                    <button
                                        className="btn btn-lg btn-primary pull-xs-right"
                                        type="submit"
                                        disabled={this.props.inProgress}>
                                        Sign up
                      </button>

                                </fieldset>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        );

    }
}

