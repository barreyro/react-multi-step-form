import React, { Component } from 'react';
import Registrants from './Registrants';


export class AdminLogin extends Component {
    renderAdminView(values) {
        let loggedIn = values.adminLoggedIn;
        if (!loggedIn) {
            return (
                <h2>Admin login form</h2>
            )
        } else {
            return (
                <Registrants
                    values={values}
                />
            )
        }
    }

    render() {
        const { values } = this.props;

        return(
            <div>
                { this.renderAdminView(values) }
            </div>
        )
    }
    
}
export default AdminLogin;