import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Alert, Button, Textarea } from "flowbite-react"
import { useState } from "react"

function CommentSection({postId}) {
    const { currentUser } = useSelector((state) => state.user)
    const [comment, setComment] = useState('')
    const [commentError, setCommentError] = useState(null) 

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
            if(!res.ok){
                setCommentError(data.message)
            }
            if(res.ok) {
                setComment('')
            }
        } catch (error) {
            setCommentError(error.message)
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
        </div>
    )
}

export default CommentSection