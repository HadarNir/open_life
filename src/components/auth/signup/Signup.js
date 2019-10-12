import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form} from "react-bootstrap";
import {Formik} from 'formik';
import * as yup from 'yup'; // for everything
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../auth.css";
import {app} from "../../../config/firebaseConfig";

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
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            birthDate: '',
            gender: 'male',
            date: new Date(),
        };
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        app.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((obj) => {
            app.firestore().collection('/profile').add({
                uid: obj.user.uid,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                birthDate: this.state.birthDate,
                gender: this.state.gender,
            }).then(r => console.log("success"))
        }).catch((error) => {
            alert(error.message)
        });
        console.log("submitted")
    };

    setBirthDate = date => {
        this.setState({date: date});
        date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
        this.setState({birthDate: date});
    };

    setGender = gender => {
        this.setState({gender: gender.currentTarget.value});
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
                    <Form noValidate onSubmit={this.handleSubmit}>
                        <Form.Row>
                            <Form.Group controlId="formFirstName">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter first name"
                                    name="firstName"
                                    value={values.firstName}
                                    onChange={this.handleChange}
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
                                    onChange={this.handleChange}
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
                                    onChange={this.handleChange}
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
                                    onChange={this.handleChange}
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
                                    onChange={this.handleChange}
                                    isInvalid={!!errors.passwordConfirm}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.passwordConfirm}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Label>Enter your Birthday </Form.Label>
                            <DatePicker selected={this.state.date} onChange={this.setBirthDate} name="birthDate"/>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group>
                                <Form.Label>Gender</Form.Label>
                                <Form.Check
                                    type="radio"
                                    label="male"
                                    name="gender"
                                    id="formGenderMale"
                                    value="male"
                                    onChange={this.setGender}
                                    defaultChecked
                                />
                                <Form.Check
                                    type="radio"
                                    label="female"
                                    name="gender"
                                    id="formGenderFemale"
                                    value="female"
                                    onChange={this.setGender}
                                />
                                <Form.Check
                                    type="radio"
                                    label="other"
                                    name="gender"
                                    id="formGenderOther"
                                    value="other"
                                    onChange={this.setGender}
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