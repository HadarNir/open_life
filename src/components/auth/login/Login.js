import React, {Component} from 'react';
import {Form, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Formik} from 'formik';
import * as yup from 'yup';
import "../auth.css";

let schema;
schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

// component for the login page
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    LoginForm = () => {
        return (
            <Formik validationSchema={schema} onSubmit={console.log} initialValues={{}}>
                {({
                      handleSubmit,
                      handleChange,
                      values,
                      errors,
                  }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="formKeepSignIn">
                                <Form.Check type="checkbox" label="Keep me sign in"/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Form.Row>
                    </Form>
                )}
            </Formik>
        );
    };

    render() {
        return (
            <div className="login">
                {this.LoginForm()}
            </div>
        )
    }
}

export default Login;