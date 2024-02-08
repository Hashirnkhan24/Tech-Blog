/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import moment from 'moment'
import { FaThumbsUp } from "react-icons/fa"
import { useSelector } from "react-redux"
import { Button, Textarea } from "flowbite-react"

function Comment({comment, onLike, onEdit, onDelete}) {
    const [user, setUser] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [editedContent, setEditedContent] = useState(comment.content)
    const { currentUser } = useSelector((state) => state.user)

    useEffect(() => {
        const getUser = async() => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`)
                const data = await res.json()
                if(res.ok) {
                    setUser(data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [comment])

    const handleEdit = async() => {
        setIsEditing(true)
        setEditedContent(comment.content)
    }

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/comment/editComment/${comment._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: editedContent,
            }),
            });
            if (res.ok) {
                setIsEditing(false);
                onEdit(comment, editedContent);
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div className="flex border-b dark:border-gray-600 p-3">
            <div className="flex-shrink-0 mr-3">
                <img className="w-10 h-10 rounded-full bg-gray-200" src={user.profilePicture} alt={user.username} />
            </div>
            
            <div className="flex-1">
                <div className="flex items-center mb-1">
                    <span className="font-bold mr-1 text-xs truncate">{ user ? `@${user.username}` : "anonymous user"}</span>
                    <span className="text-gray-500 text-xs">{moment(comment.createdAt).fromNow()}</span>
                </div>
                {
                    isEditing ? (
                        <>
                        <Textarea
                            className='mb-2'
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            rows={"3"}
                            style={{borderRadius: '2px'}}
                        />
                        <div className='flex justify-end gap-2 text-xs'>
                        <Button
                            type='button'
                            size='sm'
                            className="bg-gradient-to-r from-green-700 via-green-600 to-green-700 hover:from-blue-700 hover:via-blue-600 hover:to-blue-700"
                            style={{borderRadius: '2px'}}
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                        <Button
                            type='button'
                            size='sm'
                            className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-blue-700 hover:via-blue-600 hover:to-blue-700"
                            style={{borderRadius: '2px'}}
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </Button>
                        </div>
                        </>
                    ) : (
                        <>
                        <p className="text-gray-500 mb-2 text-sm">{comment.content}</p>
                        <div className="flex items-center p-2 border-t dark:border-color-gray-500 max-w-fit gap-2">
                            <button type="button" onClick={() => onLike(comment._id)} className={`text-sm text-slate-400 hover:text-blue-500
                            ${
                                currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'
                            }`}>
                                <FaThumbsUp />
                            </button>
                            <p className="text-gray-400 text-sm">
                                {
                                    comment.numberOfLikes && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "like" : "likes")
                                }
                            </p>
                            {
                                currentUser && (currentUser._id === comment.userId ||currentUser.isAdmin) && (
                                    <>
                                    <button 
                                    type="button"
                                    className="text-gray-400 hover:text-blue-500 text-sm hover:underline"
                                    onClick={handleEdit}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                    type="button"
                                    className="text-gray-400 hover:text-red-500 text-sm hover:underline"
                                    onClick={() => onDelete(comment._id)}
                                    >
                                        Delete
                                    </button>
                                    </>
                                )
                            }
                        </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Comment