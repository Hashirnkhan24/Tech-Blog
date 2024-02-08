import { useEffect, useState } from "react"
import moment from 'moment'
import { FaThumbsUp } from "react-icons/fa"
import { useSelector } from "react-redux"

function Comment({comment, onLike}) {
    const [user, setUser] = useState({})
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
                <p className="text-gray-500 mb-2">{comment.content}</p>
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
                </div>
            </div>
        </div>
    )
}

export default Comment