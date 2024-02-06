import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import { DashSidebar } from '../components'
import { Editor } from '@tinymce/tinymce-react'
import { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function CreatePost() {
    const [file, setFile] = useState(null)
    const [imageUploadProgress, setimageUploadProgress] = useState(null);
    const [imageUploadError, setimageUploadError] = useState(null);
    const [formData, setFormData] = useState({});

    const handleUploadImage = async() => {
        try {
            if(!file) {
                setimageUploadError("Please provide an image")
                return;
            }
            setimageUploadError(null)
            const storage = getStorage(app)
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, `images/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setimageUploadProgress(progress.toFixed(0))
                },
                (error) => {
                    console.log(error)
                    setimageUploadError("Image upload failed")
                    setimageUploadProgress(null)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setimageUploadError(null)
                        setimageUploadProgress(null)
                        setFormData({...formData, image: downloadURL})
                    })
                }
            )
        } catch (error) {
            setimageUploadError("Error uploading image")
            setimageUploadProgress(null)
            console.log(error)
        }
    }
    const handleEditorInput = () => {}

    return (
        <div className='min-h-screen flex flex-col md:flex-row'>
            <div className='md:w-56'>
                {/* sidebar */}
                <DashSidebar />
            </div>
            {/* create post */}
            <div className="p-3 max-w-4xl mx-auto min-h-screen w-full">
                <h1 className='my-7 text-3xl text-center font-semibold'>Create A Post</h1>
                <form className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-4 sm:flex-row justify-between w-full'>
                        <TextInput 
                            type='text'
                            placeholder='Title'
                            required
                            id='title'
                            className='flex-1'
                            style={{borderRadius: '2px'}}
                        />
                        <Select style={{borderRadius: '2px'}}>
                            <option value="uncategorized">Select a category</option>
                            <option value="javascript">JavaScript</option>
                            <option value="reactjs">React JS</option>
                            <option value="nextjs">NEXT JS</option>
                            <option value="nodejs">Node JS</option>
                        </Select>
                    </div>
                    <div className='border-4 border-blue-600 border-dotted'>
                    <div className='flex p-2 gap-4 items-center justify-between'>
                        <FileInput 
                            type="file" 
                            accept='images/*' 
                            style={{borderRadius: '2px', padding:'4px'}}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <Button 
                            type='button' 
                            className='rounded-sm bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-blue-700 hover:via-blue-600 hover:to-blue-700' 
                            size='sm'
                            onClick={handleUploadImage}
                            disabled={imageUploadProgress}
                        > {
                            imageUploadProgress
                            ? (<div className='w-16 h-16'>
                                <CircularProgressbar 
                                    value={imageUploadProgress}
                                    text={`${imageUploadProgress || 0}%`}
                                />
                            </div>)
                            : ("Upload Image")
                        }
                        </Button>
                    </div>
                    <div>
                    {
                            imageUploadError && (
                            <Alert color="failure" >{imageUploadError}</Alert>
                        )}
                        {
                            formData.image && (
                                    <img 
                                        src={formData.image} 
                                        alt="image"
                                        className='w-full h-76 object-cover' />
                            )
                        }
                    </div>
                    </div>
                    <Editor 
                        
                        textareaName='content'
                        initialValue="Write your posts here..."
                        apiKey={import.meta.env.VITE_TINYMCE_KEY}
                        onEditorChange={handleEditorInput}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        required
                    />
                    <Button type='submit' className='rounded-sm bg-gradient-to-r from-red-800 via-red-600 to-red-800 hover:from-blue-800 hover:via-blue-600 hover:to-blue-800 mb-2' >Publish</Button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost