import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Alert, Button, Textarea, Modal } from "flowbite-react"
import { useEffect, useState } from "react"
import { Comment } from "../components"
import { HiOutlineExclamationCircle } from "react-icons/hi"

function CommentSection({postId}) {
    const { currentUser } = useSelector((state) => state.user)
    const [comment, setComment] = useState('')
    const [commentError, setCommentError] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [commentToDelete, setCommentToDelete] = useState(null)
    const [comments, setComments] = useState([]) 
    const navigate = useNavigate()
    
    useEffect(() => {
        const getComments = async() => {
            try {
                const res = await fetch(`/api/comment/getPostComments/${postId}`);
                if(res.ok) {
                    const data = await res.json();
                    setComments(data)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        getComments()
    }, [postId])

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(comment.length > 250) {
            return;
        }
        try {
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({content: comment, postId, userId: currentUser._id})
            })
            const data = await res.json()
            if(res.ok) {
                setComment('')
                setCommentError(null)
                setComments([data, ...comments])
            }
        } catch (error) {
            setCommentError(error.message)
        }
    }

    const handleLike = async(commentId) => {
        
        try {
            if(!currentUser) {
                navigate('/sign-in')
                return;
            }
            const res = await fetch(`/api/comment/likeComment/${commentId}`,{
                method: 'PUT',
                credentials: 'include',
            })
            
            if(res.ok) {
                const data = await res.json()
                
                setComments(
                    comments.map((comment) => 
                        comment._id === commentId 
                        ? {
                            ...comment,
                            likes: data.likes,
                            numberOfLikes: data.likes.length,
                        } : comment
                ))
            }
        } catch (error) {
            console.log(error.message)
        }
    } 

    const handleEdit = async(comment, editedContent) => {
        setComments(
            comments.map((c) => 
            c._id === comment._id ? {...c, content: editedContent} : c)
        )
    }

    const handleDelete = async(commentId) => {
        setShowModal(false)
        try {
            if(!currentUser) {
                navigate('/sign-in')
                return;
            }
            const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
                method: 'DELETE',
            })
            if(res.ok) {
                const data = await res.json();
                setComments(comments.filter((comment) => comment._id !== commentId))
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="max-w-2xl p-3 mx-auto w-full">
            {currentUser 
            ? (
                <div className="flex gap-1 items-center text-gray-500 my-5 text-sm">
                    <p>Signed in as </p>
                    <img className="w-5 h-5 rounded-full object-cover" src={currentUser.profilePicture} alt={currentUser.username} />
                    <Link className="text-xs text-blue-400 hover:underline" to={`/dashboard?tab=profile`}>
                        @{currentUser.username}
                    </Link>
                </div>
            )
            : (
                <div className="text-sm my-5 flex gap-1">
                    You must be signed in to comment.
                    <Link className="text-blue-400" to={'/sign-in'}>Sign In</Link>
                </div>
            )
        }
        {currentUser && (
            <form className="border border-slate-400 rounded-sm p-3" onSubmit={handleSubmit}>
                <Textarea 
                    placeholder="Add a comment..."
                    rows='4'
                    maxLength='250'
                    style={{borderRadius: '2px'}}
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                />
                <div className="flex justify-between items-center py-2 mx-2">
                    <p className="text-sm italic text-gray-500">{250 - comment.length} characters left</p>
                <Button type="submit" style={{borderRadius: '2px'}} size={"sm"} className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-700">Submit</Button>
                </div>
            </form>
        )}
        {commentError && (
            <Alert color={"failure"}>{commentError}</Alert>
        )}
        {comments.length === 0 
        ? (<p className="text-sm my-5">No comments yet.</p>)
        : (
            <>
            <div className="text-sm my-5 flex gap-1 items-center">
                <p>Comments</p>
                <div className="px-2 py-1 rounded-sm border border-slate-500">
                    <p>{comments.length}</p>
                </div>
            </div>
            {comments.map((comment) => (
                <Comment
                    key={comment._id}
                    comment={comment}
                    onLike={handleLike}
                    onEdit={handleEdit}
                    onDelete={(commentId) => {
                        setShowModal(true)
                        setCommentToDelete(commentId)
                    }}
                />
            ))}
            </>
        )}
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
                        <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-300" >Are your sure you want to delete this comment?</h3>
                    </div>
                    <div className="flex justify-center gap-3">
                        <Button color="failure" onClick={() => handleDelete(commentToDelete)} >Yes, I am sure</Button>
                        <Button color="gray" onClick={() => setShowModal(false)} >No, cancel</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default CommentSection