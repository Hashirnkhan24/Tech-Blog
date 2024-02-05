import { useSelector } from "react-redux"
import { Alert, Button, TextInput } from "flowbite-react"
import { useEffect, useRef, useState } from "react"
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from "firebase/storage"
import { app } from "../firebase"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function DashProfile() {
    const { currentUser } = useSelector((state) => state.user)
    const [imageFile, setImageFile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [imageFileUploadProgress, setimageFileUploadProgress] = useState(null)
    const [imageFileUploadError, setImageFileUploadError] = useState(null)
    const filePickerRef = useRef()

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
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{setImageFileUrl(downloadURL)});
            }
        )
    }

    return (
        <div className="max-w-lg mx-auto w-full">
            <h1 className="mb-6 mt-8 text-2xl text-center font-semibold">Profile</h1>
            <form className="flex flex-col gap-2">
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
                <TextInput 
                    type="text" 
                    placeholder="username" 
                    id="username" 
                    defaultValue={currentUser.username} 
                    style={{borderRadius: "2px"}}
                    className="shadow-md"
                />
                <TextInput 
                    type="email" 
                    placeholder="email" 
                    id="email" 
                    defaultValue={currentUser.email} 
                    style={{borderRadius: "2px"}}
                    className="shadow-md"
                />
                <TextInput 
                    type="password" 
                    placeholder="password"  
                    id="password" 
                    style={{borderRadius: "2px"}}
                    className="shadow-md"
                />
                <Button type="submit" className="rounded-sm bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 hover:bg-gradient-to-r hover:from-red-800 hover:via-red-700 hover:to-red-800 mt-2" >Update</Button>
            </form>
            <div className="flex justify-between text-red-500 mt-3">
                <span className="hover:underline">Delete Account</span>
                <span className="hover:underline">Sign Out</span>
            </div>
        </div>
    )
}

export default DashProfile