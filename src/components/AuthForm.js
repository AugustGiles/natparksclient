import React, {Component} from 'react';
import { Form, Modal, Message } from "semantic-ui-react";

class AuthForm extends Component {
    state = {
        username: "",
        password: "",
        passwordConfirmation: ""
     }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.validateInputs()) {
            this.props.onSubmitHandler(this.state)
        }
    }

    validateInputs = () => {
        // Check if all fields are filled
        if (this.props.formType==='login') {
            if (this.state.username==="" || this.state.password==="") {
                // Add Error
                this.props.addError("Username/Password Required")
                return false
            }
        } else {
            if (this.state.username==="" || this.state.password==="" || this.state.passwordConfirmation==="") {
                // Add Error
                this.props.addError("Username/Password/Password Confirmation Required")
                return false
            }
            if (this.state.password!==this.state.passwordConfirmation) {
                this.props.addError("Password and Password Confirmation must match")
                return false
            }
        }
        return true
    }

    

    render() {
        const {formType, errorMessage} = this.props
        return (
            <React.Fragment >
                <Modal.Header>{formType==="login"?"Login":"Sign Up"}</Modal.Header>
                <Modal.Content >
                    <Form error={errorMessage}>
                        <Message
                            error
                            header='Error'
                            content={errorMessage}
                        />
                        <Form.Field>
                            <label>Username</label>
                            <input value={this.state.username} placeholder='Username'
                                    onChange={this.handleChange} name="username" />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input value={this.state.password} placeholder='Password'
                                    onChange={this.handleChange} name="password" type="password"/>
                        </Form.Field>
                        {formType==='signup' && 
                        <Form.Field>
                            <label>Password Confirmaton</label>
                            <input  value={this.state.passwordConfirmation}
                                    placeholder='Password Confirmation'
                                    onChange={this.handleChange}
                                    name="passwordConfirmation" type="password"/>
                        </Form.Field>}
                        <Form.Button onClick={this.handleSubmit}>{formType==="login"?"Login":"Sign Up"}</Form.Button>
                    </Form>
                </Modal.Content>
            </React.Fragment>
         );
    }
}

export default AuthForm;
