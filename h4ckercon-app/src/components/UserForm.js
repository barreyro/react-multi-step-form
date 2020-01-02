import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import FormConferenceDetails from './FormConferenceDetails';
import Success from './Success';
import AdminLogin from './AdminLogin';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export class UserForm extends Component {
    state = {
        step: 1,
        firstName: '',
        lastName: '',
        email: '',
        location: '',
        interests: [],
		tshirtSize: '',
		adminLoggedIn:true,
		registrants: []
    }

    // Go to the next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1,
        })
    }

    // Go to the previous step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1,
        })        
	}

	// Go to admin
	goToAdmin = () => {
        this.setState({
            step: 0
        })        
	}

	refreshState = () => {
        this.setState({
            step: 1
        })        
	}

    // Handle input change
    handleChange = input => (e) => {
		// check if we are handling the interests checkboxes
		if (input === 'interests') {
			// current array of interests
			let selectedInterests = this.state.interests;
			// check if checkbox is selected or unchecked
			if (e.target.checked){
				// add the name to the array
				selectedInterests.push(e.target.value);
			} else {
				// remove the value of the interest from the arrray
				selectedInterests = selectedInterests.filter( i => i !== e.target.value )
			}
			this.setState({ interests: selectedInterests })
		} else { 
			this.setState({[input]: e.target.value })
		}
	}
	

	renderSwitch(step, values) {
		switch (step) {
			default:
			case 0: 
		   		return (
			   		<AdminLogin
				 	   handleChange = {this.handleChange}
					   values = {values}
					/>
				)
			case 1: 
		   		return (
			   		<FormUserDetails
				 		nextStep = {this.nextStep}
				 		handleChange = {this.handleChange}
				 		values = {values}
			   		/>
		   		)
			case 2: 
				return (
					<FormConferenceDetails
						nextStep = { this.nextStep }
						prevStep = { this.prevStep }
						handleChange = { this.handleChange }
						values = { values }
					/>
				)
			case 3: 
				return  <Success/>
		}
	}
    render() {
        const { step, firstName, lastName, email, location, interests, tshirtSize, registrants, adminLoggedIn} = this.state
        const values = { step, firstName, lastName, email, location, interests, tshirtSize, registrants, adminLoggedIn};
		return (
			<div>
				<React.Fragment>
					<AppBar
                    	position="static">
                    	<Toolbar>
							<Button
								color="default"
								onClick={() => { this.refreshState() }}>
								h4cker con registration |
							</Button>
							<Button
								color="default"
								onClick={() => { this.goToAdmin() }}>
								Admin Login
							</Button>
                    	</Toolbar>
                	</AppBar> 
				</React.Fragment>
				{this.renderSwitch(step, values)}
			</div>

		)
    }
}

export default UserForm