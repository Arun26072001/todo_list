import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function UserForm({ handleSubmit, userObj, handleChange, errors, handleChangeUser }) {
    return (
        <div className="w-100 d-flex justify-content-center align-items-center flex-column p-3">
            <h3 className='text-ceter text-secondary'>User From</h3>
            <div className="col-lg-5 col-md-5 col-12 p-2 shadow-sm p-3 mb-5 bg-body-tertiary rounded">
                <Form onSubmit={(e) => handleSubmit(e, userObj._id ? "update" : "add")} noValidate>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter full name"
                            value={userObj?.name || ""}
                            onChange={(e)=>handleChange(e.target.value, "name")}
                            isInvalid={errors.some((error) => error.toLowerCase().includes("name"))}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.find((error) => error.toLowerCase().includes("name")) || ""}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={userObj?.email || ""}
                            onChange={(e)=>handleChange(e.target.value, "email")}
                            isInvalid={errors.some((error) => error.toLowerCase().includes("email"))}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.find((error) => error.toLowerCase().includes("email")) || ""}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="text"
                            name="password"
                            placeholder="Enter password"
                            value={userObj?.password || ""}
                            onChange={(e) => handleChange(e.target.value, "password")}
                            isInvalid={errors.some((error) => error.toLowerCase().includes("password"))}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.find((error) => error.toLowerCase().includes("password")) || ""}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formContact">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control
                            type="text"
                            name="contact"
                            placeholder="Enter contact number"
                            value={userObj?.contact || ""}
                            onChange={(e) => handleChange(e.target.value, "contact")}
                            isInvalid={errors.some((error) => error.toLowerCase().includes("contact"))}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.find((error) => error.toLowerCase().includes("contact")) || ""}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="address"
                            rows={3}
                            placeholder="Enter address"
                            value={userObj?.address || ""}
                            onChange={(e) => handleChange(e.target.value, "address")}
                            isInvalid={errors.some((error) => error.toLowerCase().includes("address"))}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.find((error) => error.toLowerCase().includes("address")) || ""}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex gap-2 justify-content-center">
                        <Button
                            variant="secondary"
                            type="button" // prevent form submit
                            onClick={handleChangeUser}
                        >
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>

            </div>
        </div>
    )
}
