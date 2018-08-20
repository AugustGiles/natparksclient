import React, {Component} from 'react';
import { Form, Modal } from "semantic-ui-react";

class AuthForm extends Component {
    state = { 
        username: "",
        password: ""
     }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.onSubmitHandler(this.state)
    }

    render() { 
        const {formType} = this.props
        return ( 
            <React.Fragment >
                <Modal.Header>{formType==="login"?"Login":"Sign Up"}</Modal.Header>
                <Modal.Content >
                    <Form>
                        <Form.Field>
                            <label>Username</label>
                            <input value={this.state.username} placeholder='Username' 
                                    onChange={this.handleChange} name="username" />
                        </Form.Field>
                        <Form.Field>
                            <label>Username</label>
                            <input value={this.state.password} placeholder='Password' 
                                    onChange={this.handleChange} name="password" type="password"/>
                        </Form.Field>
                        <Form.Button onClick={this.handleSubmit}>{formType==="login"?"Login":"Sign Up"}</Form.Button>
                    </Form>
                </Modal.Content>
            </React.Fragment>
         );
    }
}
 
export default AuthForm;