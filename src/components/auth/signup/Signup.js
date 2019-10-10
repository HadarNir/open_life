import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form} from "react-bootstrap";
import {Formik} from 'formik';
import * as yup from 'yup'; // for everything
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let schema;
schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    gender: yup.bool().required(),
    terms: yup.bool().required(),
});

// component for the signup page
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        }
    }

    handleChange = date => {
        this.setState({
            date: date
        });
    };

    FormExample = () => {
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
                            <Form.Group controlId="formFirstName">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter first name"
                                    name="firstName"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    isInvalid={!!errors.firstName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    first name is a required field
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formLastName">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter last name"
                                    name="lastName"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    isInvalid={!!errors.lastName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    last name is a required field
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
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
                            <Form.Group controlId="formPasswordConfirm">
                                <Form.Label>Confirm your password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    name="passwordConfirm"
                                    value={values.passwordConfirm}
                                    onChange={handleChange}
                                    isInvalid={!!errors.passwordConfirm}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.passwordConfirm}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Label>Enter your Birthday </Form.Label>
                            <DatePicker selected={this.state.date} onChange={this.handleChange}/>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group>
                                <Form.Label>Gender</Form.Label>
                                <Form.Check
                                    type="radio"
                                    label="male"
                                    name="gender"
                                    id="formGenderMale"
                                    defaultChecked
                                />
                                <Form.Check
                                    type="radio"
                                    label="female"
                                    name="gender"
                                    id="formGenderFemale"
                                />
                                <Form.Check
                                    type="radio"
                                    label="other"
                                    name="gender"
                                    id="formGenderOther"
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group>
                                <Form.Check
                                    required
                                    name="terms"
                                    label="Agree to terms and conditions"
                                    onChange={handleChange}
                                    isInvalid={!!errors.terms}
                                    feedback={errors.terms}
                                    id="formCheck"
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Button type="submit">Sign up</Button>
                        </Form.Row>
                    </Form>
                )}
            </Formik>
        );
    };

    render() {
        return (
            <div className="signup">
                {this.FormExample()}
            </div>
        )
    }
}

export default Signup;