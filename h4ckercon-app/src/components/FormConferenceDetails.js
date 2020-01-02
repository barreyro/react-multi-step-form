import React, { Component } from 'react';
// TODO: polish themes
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';



export class FormConferenceDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
	}

    goBack = e => {
        e.preventDefault();
        this.props.prevStep();
	}

    validInputs = () => {
        return this.props.values.interests.length && this.props.values.tshirtSize && this.props.values.location;
	}

	transformInterests = (obj) => {
		return JSON.stringify(obj)	
	}

	submitForm = (e) => {
		e.preventDefault();
		const {
			firstName,
			lastName,
			email,
			tshirtSize,
			location
		} = this.props.values;
		const interestsString = JSON.stringify(this.props.values.interests);

	    fetch('http://localhost:8080/registrants', {
      		method: 'post',
      		headers: {
        		'Content-Type': 'application/json'
      		},
      		body: JSON.stringify({
				firstName,
				lastName,
				email,
				tshirtSize,
				location,
				interests: interestsString
      		})
    	})
      	.then(res => {
			this.props.nextStep();
      	})
      	.catch(err => console.log(err))
	}

	locations = [
		'Boston',
		'New York',
		'Seattle',
		'San Diego'
	]

	tshirtSizes = [
		'Womens S',
		'Womens M',
		'Womens L',
		'Womens XL',
		'Womens XXL',
		'Womens 3XL',
		'Mens S',
		'Mens M',
		'Mens L',
		'Mens XL',
		'Mens XXL',
		'Mens 3XL'
	]

	interestsList = [
		{ name: '101 Talks & Workshops' },
		{ name: 'Application Security' },
		{ name: 'Getting Ahead of Attackers' },
		{ name: 'Internet of Things' },
		{ name: 'Offensive Security' },
		{ name: 'Web Hacking' }
	];
	
    render() {
        const { values, handleChange } = this.props;

        return (
            <React.Fragment>

                <FormControl style={styles.formControl}>
                    <InputLabel>Select your location</InputLabel>
                    <Select
                        defaultValue={ values.location }
                        onChange={handleChange('location')}
                    >
						{this.locations.map(l=> 
                        	<MenuItem key={l} value={l}>{l}</MenuItem>
						)}
                    </Select>
                </FormControl>
                <br/>
                <FormControl style={styles.formControl}>
                    <InputLabel>Select your t-shirt size</InputLabel>
                    <Select
                      defaultValue={ values.tshirtSize }
                      onChange={handleChange('tshirtSize')}>
						{this.tshirtSizes.map(size => 
                        	<MenuItem key={size} value={size}>{size}</MenuItem>
						)}
                    </Select>
                </FormControl>
				<br/>
                <FormControl component='fieldset'>
					<FormLabel component="legend">Your Security Interests</FormLabel>
					<FormGroup>
						{this.interestsList.map(i => 
							<FormControlLabel
							  key={i.name}
							  value={i.name}
							  label={i.name}
							  control={
									<Checkbox
									  onChange={handleChange('interests')}
									  checked={values.interests.includes(i.name)}
									/>
								}
							/>
						)}
					</FormGroup>
                </FormControl>
                <br/>
                <br/>
                <Button 
                  variant="contained"
                  color="secondary"
                  style={ styles.button }
                  onClick={ this.goBack } >
                    Go Back
                </Button>
                <Button 
                  variant="contained"
                  color="primary"
				  style={ styles.button }
				  disabled={ !this.validInputs() }
                  onClick={ this.submitForm }>
                    Submit
                </Button>
            </React.Fragment>
        )
    }
}

const styles = {
    formControl: {
        margin: 20,
        minWidth: 250,
    },
    button: {
        margin: 15
	},
	root: {
		display: 'flex'
	}
}
export default FormConferenceDetails;