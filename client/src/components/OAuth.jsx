import {Button} from 'flowbite-react'
import {AiFillGoogleCircle} from 'react-icons/ai'
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

function OAuth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async() => {
        const provider = new GoogleAuthProvider()
        provider.getCustomParameters({prompt: 'select_account'})
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                })
            })
            const data = await res.json()
            console.log(data)
            if(res.ok) {
                dispatch(signInSuccess(data.rest))
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Button className='rounded-sm bg-gradient-to-r from-slate-800 via-slate-600 to-slate-700 hover:bg-gradient-to-r  hover:from-slate-700 hover:via-slate-600 hover:to-slate-800' onClick={handleGoogleClick}>
            <AiFillGoogleCircle className='w-6 h-6 mr-2' />
            Continue with Google 
        </Button>
    )
}

export default OAuth