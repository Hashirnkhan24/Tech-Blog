import { useDispatch, useSelector } from "react-redux"
import { Alert, Button, Modal, TextInput } from "flowbite-react"
import { useEffect, useRef, useState } from "react"
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from "firebase/storage"
import { app } from "../firebase"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { signOutSuccess, updateFailure, updateSuccess, updateStart, deleteUserFailure, deleteUserStart, deleteUserSuccess } from "../redux/user/userSlice"
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'

function DashProfile() {
    const { currentUser, error } = useSelector((state) => state.user)
    const [imageFile, setImageFile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [imageFileUploadProgress, setimageFileUploadProgress] = useState(null)
    const [imageFileUploadError, setImageFileUploadError] = useState(null)
    const [formData, setFormData] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [showUpdateSuccess, setShowUpdateSuccess] = useState(false)
    const filePickerRef = useRef()
    const dispatch = useDispatch()

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file))
        }
    }

    useEffect(() => {
        if(imageFile) {
            uploadImage() 
        }
    }, [imageFile])

    const uploadImage = async() => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        setImageFileUploadError(null)
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setimageFileUploadProgress(progress.toFixed(0))
            },
            (error) => {
                setImageFileUploadError("Could not upload the image")
                setimageFileUploadProgress(null)
                setImageFile(null)
                setImageFileUrl(null)
                console.error(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
                    setImageFileUrl(downloadURL)
                    setFormData({...formData, profilePicture: downloadURL})
                })
                
            }
        )
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id] : e.target.value})
    }
    
    const handleDeleteUser = async() => {
        setShowModal(false)
        try {
            dispatch(deleteUserStart())
            const res = await fetch(`http://localhost:3000/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            const data = await res.json()
            if(!res.ok) {
                dispatch(deleteUserFailure(data.message))
            } else {
                dispatch(deleteUserSuccess(data))
            }

        } catch (error) {
            dispatch(deleteUserFailure(error.message))
        }

    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(Object.keys(formData).length === 0) {
            return;
        }
        try {
            dispatch(updateStart())
            
            const res = await fetch(`http://localhost:3000/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if(!res.ok) {
                dispatch(updateFailure(data.message))
                setShowUpdateSuccess(false)
            } else {
                dispatch(updateSuccess(data))
                setShowUpdateSuccess(true)
            }
        } catch (error) {
            dispatch(updateFailure(error.message))
        }
    }

    const handleSignOut = async() => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            })
            const data = await res.json()
            if(!res.ok){
                console.log(data.message)
            } else {
                dispatch(signOutSuccess())
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleCreatePost = async() => {

    }
    return (
        <div className="max-w-lg mx-auto w-full">
            <h1 className="mb-6 mt-8 text-2xl text-center font-semibold">Profile</h1>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} className="hidden"/>
                <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full mb-4">
                    {imageFileUploadProgress && imageFileUploadProgress < 100 && (
                        <CircularProgressbar 
                            value={imageFileUploadProgress || 0}
                            text={`${imageFileUploadProgress}%`}
                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                },
                                path: {
                                    stroke: `rgba(162, 152, 199, ${imageFileUploadProgress / 100})`
                                }
                            }}
                        />
                    )}
                    <img src={imageFileUrl || currentUser.profilePicture} alt="user" className={`rounded-full border-4 border-gray-200 object-cover w-full h-full ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-50'}`} onClick={() => filePickerRef.current.click()}/>
                </div>
                {imageFileUploadError && (
                    <Alert color={"failure"}>{imageFileUploadError}</Alert>
                )}
                {error && (
                    <Alert color={"failure"}>{error}</Alert>
                )}
                {showUpdateSuccess && (
                    <Alert color={"success"} onClick={() => setShowUpdateSuccess(false)}>User updated successfully</Alert>
                )}
                <TextInput 
                    type="text" 
                    placeholder="username" 
                    id="username" 
                    defaultValue={currentUser.username} 
                    style={{borderRadius: "2px"}}
                    className="shadow-md mx-2"
                    onChange={handleChange}
                />
                <TextInput 
                    type="email" 
                    placeholder="email" 
                    id="email" 
                    defaultValue={currentUser.email} 
                    style={{borderRadius: "2px"}}
                    className="shadow-md mx-2"
                    onChange={handleChange}
                />
                <TextInput 
                    type="password" 
                    placeholder="password"  
                    id="password" 
                    style={{borderRadius: "2px"}}
                    className="shadow-md mx-2"
                    onChange={handleChange}
                />
                <Button 
                    type="submit" 
                    className="mx-2 rounded-sm bg-gradient-to-r from-red-800 via-red-600 to-red-800 hover:bg-gradient-to-r hover:from-slate-800 hover:via-slate-700 hover:to-slate-800 mt-2"
                    >Update
                </Button>
                {currentUser.isAdmin && (
                    <Link to="/create-post" className="mx-2">
                    <Button 
                        onClick={handleCreatePost} 
                        className=" w-full rounded-sm bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 hover:bg-gradient-to-r hover:from-slate-800 hover:via-slate-700 hover:to-slate-800 mt-2" >Create Post
                    </Button>
                    </Link>
                )}
            </form>
            <div className="flex justify-between text-red-500 mt-3 mx-3">
                <span onClick={() => setShowModal(true)} className="hover:underline">Delete Account</span>
                <span onClick={handleSignOut} className="hover:underline">Sign Out</span>
            </div>
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
                        <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-300" >Are your sure you want to delete this account?</h3>
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

export default DashProfile