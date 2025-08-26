import React, { useEffect, useState } from 'react';
import Table from "react-bootstrap/Table";
import axios from "axios";
import UserForm from './UserForm';
import { toast } from 'react-toastify';
import Button from "react-bootstrap/Button";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [isChangeUser, setIsChangeUser] = useState(false);
    const [userObj, setUserObj] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const url = "http://localhost:3030";

    function handleChangeUserObj(value, name) {
        console.log(value, name);
        setUserObj((pre) => ({
            ...pre,
            [name]: value
        }))
    }

    function handleChangeUser() {
        if (isChangeUser) {
            setUserObj({});
            setErrors([]);
        }
        setIsChangeUser(!isChangeUser)
    }

    function handleSubmit(e, type) {
        e.preventDefault();
        if (type === "add") {
            addUser();
        } else if (type === "update") {
            handleUpdate();
        }
    }

    async function addUser() {
        try {
            setErrors([]);
            const res = await axios.post(`${url}/api/user`, userObj);
            setUserObj({});
            handleChangeUser();
            toast.success(res.data?.message);
            fetchUsers();
        } catch (error) {
            const errorList = error.response?.data?.errors || [];
            if (errorList.length) {
                setErrors(errorList)
            }
            const errorMsg = error.response?.data?.message || "";
            if (errorMsg) {
                toast.error(errorMsg)
            }
        }
    }

    async function handleDelete(user) {
        const confirm = window.confirm(
            `Are you sure you want to delete ${user.name}?`
        );
        if (confirm) {
            try {
                const res = await axios.delete(`${url}/api/user/${user._id}`)
                toast.success(res.data?.message || "user has been deleted");
                fetchUsers();
            } catch (error) {
                toast.error(error.response?.data?.message || "Something went wrong!");
            }
        }
    }

    async function handleUpdate() {
        try {
            setErrors([])
            const res = await axios.put(`${url}/api/user/${userObj._id}`, userObj);
            setUserObj({});
            toast.success(res.data?.message || "User has been updated");
            handleChangeUser();
            fetchUsers();
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    }

    async function fetchUsers() {
        try {
            setIsLoading(true);
            const res = await axios.get(`${url}/api/user`);
            setUsers(res.data.users);
        } catch (error) {
            console.log("error in get users", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [isChangeUser])

    if (isChangeUser) {
        return <UserForm userObj={userObj} handleChangeUser={handleChangeUser} handleChange={handleChangeUserObj} errors={errors} handleSubmit={handleSubmit} />
    }
    return (
        isLoading ? <p>Loading...</p> :
            <div className='d-flex justify-content-center w-100 vh-100 position-relative'>
                <div className='col-lg-10 col-md-10 col-12'>
                    <div className="d-flex justify-content-around">
                        <h3 className='text-center text-secondary'>User List</h3>
                    </div>
                    <Table striped bordered hover size='sm'>
                        <thead>
                            <tr>
                                <td>SNo</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Password</td>
                                <td>Contact</td>
                                <td>Address</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.length > 0 ?
                                    users.map((user, index) => {
                                        return <tr key={user._id}>
                                            <td>{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{"*".repeat(user.password?.length || 0)}</td>
                                            <td>{user.contact || "N/A"}</td>
                                            <td>{user.address || "N/A"}</td>
                                            <td className='gap-1'>
                                                <Button onClick={() => {
                                                    setUserObj(user)
                                                    handleChangeUser()
                                                }} title="Edit User" variant="outline-primary" size="sm" className="me-2">✏️</Button>
                                                <Button onClick={() => handleDelete(user)} title="Delete User" variant="outline-danger" size="sm">❌</Button>
                                            </td>
                                        </tr>
                                    }) :
                                    <tr>
                                        <td colSpan="7" className='text-center text-danger fw-bold'>User data not found</td>
                                    </tr>
                            }
                        </tbody>
                    </Table>
                </div>

                <Button
                    onClick={handleChangeUser}
                    title='add user'
                    className='position-fixed rounded-circle shadow-lg'
                    style={{ bottom: "20px", right: "20px", width: "50px", height: "50px", fontSize: "20px", fontWeight: 600 }}
                >
                    +
                </Button>
            </div>

    )
}
