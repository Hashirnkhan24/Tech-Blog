import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { Table, Modal, Button } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { FaCheck, FaTimes } from 'react-icons/fa'

function DashUsers() {
    const [users, setUsers]  = useState([])
    const [showMore, setShowMore] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [deleteUserId, setDeleteUserId] = useState('')
    const { currentUser } = useSelector((state) => state.user)
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`/api/user/getusers?`)
                const data = await res.json()
                if(res.ok) {
                    setUsers(data.users)
                    if(data.users.length < 9) {
                        setShowMore(false)
                    }
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        if(currentUser.isAdmin) {
            fetchUsers()
        }

    }, [currentUser._id, currentUser.isAdmin])
    
    const handleShowMore = async() => {
        const startIndex = users.length
        try {
            const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`)
            const data = await res.json()
            if(res.ok) {
                setUsers((prev) => [...prev, ...data.users])
                if(data.users.length < 9) {
                    setShowMore(false)
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleDeleteUser = async() => {
        setShowModal(false)
        try {
            const res = await fetch(`/api/user/delete/${deleteUserId}/`, {
                method: 'DELETE',
                credentials: 'include',
            })
            const data = await res.json()
            if(!res.ok) {
                console.log(data.message)
            } else {
                setUsers((prev) => prev.filter(user => user._id !== deleteUserId))
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className="table-auto overflow-x-scroll w-full md:mx-auto p-3 m-2 scrollbar-track-slate-100 scrollbar">
            {currentUser.isAdmin && users.length > 0 
            ? <>
                <Table hoverable className="shadow-md h-screen">
                    <Table.Head>
                        <Table.HeadCell style={{borderRadius : "2px"}}>Date Joined</Table.HeadCell>
                        <Table.HeadCell style={{borderRadius : "2px"}}>Profile Image</Table.HeadCell>
                        <Table.HeadCell style={{borderRadius : "2px"}}>Username</Table.HeadCell>
                        <Table.HeadCell style={{borderRadius : "2px"}}>Email</Table.HeadCell>
                        <Table.HeadCell style={{borderRadius : "2px"}}>Admin</Table.HeadCell>
                        <Table.HeadCell style={{borderRadius : "2px"}}>Delete</Table.HeadCell>
                    </Table.Head>
                    {users.map((user) => (
                        <Table.Body key={user._id} >
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-slate-800 " >
                                <Table.Cell style={{borderRadius : "2px"}}>
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </Table.Cell >
                                <Table.Cell style={{borderRadius : "2px"}}>
                                    <img src={user.profilePicture} alt={user.username} className="rounded-full w-12 h-12 object-cover" />
                                </Table.Cell >
                                <Table.Cell style={{borderRadius : "2px"}}>
                                        <h1 className="text-md font-medium dark:text-gray-100">{user.username}</h1>
                                </Table.Cell>
                                <Table.Cell style={{borderRadius : "2px"}}>
                                        <h1 className="text-md font-medium dark:text-gray-100">{user.email}</h1>
                                </Table.Cell>
                                <Table.Cell style={{borderRadius : "2px"}}>
                                    {user.isAdmin ? (
                                    
                                    <FaCheck className="text-green-500 self-center" />
                                    ) : (
                                    
                                    <FaTimes className="text-red-500 self-center" />
                                    )}
                                </Table.Cell>
                                <Table.Cell style={{borderRadius : "2px"}}>
                                    <span 
                                        onClick={() => {
                                        setShowModal(true)
                                        setDeleteUserId(user._id)
                                    }} 
                                        className="text-red-500 font-medium hover:underline hover:cursor-pointer">Delete</span>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))}
                </Table>
                {showMore && (
                    <button onClick={handleShowMore} className="w-full self-center text-blue-500 py-4 text-md hover:underline">Show More</button>
                )}
            </>
            : (<p>You have no users yet</p>)
        }
        <Modal 
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size="md"
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="w-14 h-14 mb-4 mx-auto text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-300" >Are your sure you want to delete this user?</h3>
                    </div>
                    <div className="flex justify-center gap-3">
                        <Button color="failure" onClick={handleDeleteUser} >Yes, I am sure</Button>
                        <Button color="gray" onClick={() => setShowModal(false)} >No, cancel</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DashUsers