import React, { Component } from 'react';
// TODO: polish themes
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class FormUserDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    validEmail = () => {
        //TODO: also check if email is already in the DB
        var regex= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(this.props.values.email).toLowerCase());
    }

    validInputs = () => {
        return this.props.values.firstName && this.props.values.lastName && this.validEmail();
    }

    render() {
        const { values, handleChange } = this.props;
        
        return  (
            <React.Fragment>
                <TextField 
                    defaultValue={values.firstName}
                    label="First Name"
                    onChange={ handleChange('firstName') }
                />
                <br/>
                <TextField 
                    defaultValue={values.lastName}
                    label="Last Name"
                    onChange={ handleChange('lastName') }
                />
                <br/>
                <TextField 
                    defaultValue={ values.email }
                    label="E-mail"
                    onChange={ handleChange('email') }
                />
                <br/>
                <Button 
                    variant="contained"
                    color="primary"
                    style={ styles.button }
                    onClick={ this.continue }
                    disabled={ !this.validInputs() }
                > Continue 
                </Button>
            </React.Fragment>
        )
    }
}

const styles = {
    button: {
        margin: 15
    }
}
export default FormUserDetails;