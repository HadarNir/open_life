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
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("password confirm is a required field"),
    gender: yup.string().required(),
    date: yup.string().required(),
    terms: yup.bool().oneOf([true], 'Must Accept Terms and Conditions').required(),
});


// component for the signup page
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getBirthDate = date => {
        date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
        return date;
    };

    SignupForm = () => {
        return (
            <Formik validationSchema={schema}
                    onSubmit={
                        values => {
                            values.birthDate = this.getBirthDate(values.date);
                            console.log(values);
                            app.auth().createUserWithEmailAndPassword(values.email, values.password).then((obj) => {
                                app.firestore().collection('/profile').add({
                                    uid: obj.user.uid,
                                    email: values.email,
                                    password: values.password,
                                    firstName: values.firstName,
                                    lastName: values.lastName,
                                    birthDate: values.birthDate,
                                    gender: values.gender,
                                }).then(r => console.log("success"))
                            }).catch((error) => {
                                alert(error.message)
                            });
                            console.log("submitted")
                        }
                    }
                    initialValues={{
                        email: '',
                        password: '',
                        passwordConfirm: '',
                        firstName: '',
                        lastName: '',
                        birthDate: '',
                        gender: 'male',
                        date: new Date(),
                    }}>
                {({
                      handleSubmit,
                      handleChange,
                      values,
                      errors,
                      setFieldValue,
                      touched
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
                                    isInvalid={touched.firstName && errors.firstName}
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
                                    isInvalid={touched.lastName && errors.lastName}
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
                                    isInvalid={touched.email && errors.email}
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
                                    isInvalid={touched.password && errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="formPasswordConfirm">
                                <Form.Label>Password confirm</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password confirm"
                                    name="passwordConfirm"
                                    value={values.passwordConfirm}
                                    onChange={handleChange}
                                    isInvalid={touched.passwordConfirm && errors.passwordConfirm}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.passwordConfirm}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Label>Enter your Birthday</Form.Label>
                            <DatePicker selected= {values.date} value={values.date} onChange={e => setFieldValue('date', e)} isInvalid={touched.date && errors.date}
                                        feedback={errors.date} name="date"/>
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
                                    onChange={handleChange}
                                    defaultChecked
                                />
                                <Form.Check
                                    type="radio"
                                    label="female"
                                    name="gender"
                                    id="formGenderFemale"
                                    value="female"
                                    onChange={handleChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label="other"
                                    name="gender"
                                    id="formGenderOther"
                                    value="other"
                                    onChange={handleChange}
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
                                    isInvalid={touched.terms && errors.terms}
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
                {this.SignupForm()}
            </div>
        )
    }
}

export default Signup;