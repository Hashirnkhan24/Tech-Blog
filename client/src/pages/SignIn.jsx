import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function SignIn() {
    const [formData, setFormData] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(null)
    const navigate = useNavigate()

    const onChangeHandler = (e) => {
        setFormData((prevFormData) => ({...prevFormData, [e.target.id] : e.target.value}))
    }
    
    const onSubmitHandler = async(e) => {
        e.preventDefault()
        if(!formData.password || !formData.email) {
            setErrorMessage('Please fill in all the fields')
        }
        try {
            // setErrorMessage(null)
            setLoading(true)
            // POST Request for sign-up
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if(data.success === false) {
                setErrorMessage(data.message)
            }
            setLoading(false)
            if(res.ok) {
                navigate("/")
            }
        } catch (error) {
            setErrorMessage(error.message)
            setLoading(false)
        }
    }

    return (
        <section className="min-h-screen shadow-xl">
            <div className="flex flex-col p-3 max-w-3xl mx-auto sm:flex-row sm:items-center">
                {/* left */}
                <div className="flex-1 mr-2 py-16 sm:pt-32 flex flex-col items-center sm:items-start">
                    <Link to="/" className="font-bold dark:text-white text-4xl">
                        <span className="px-2 py-1 bg-gradient-to-r from-red-800 via-red-700 to-red-600 mx-1 rounded-sm text-white">Tech</span>
                        Blog
                    </Link>
                    <p className="text-sm mt-5 text-center sm:text-left">This a demo blog, you can signin using email and password</p>
                </div>
                {/* right */}
                <div className="flex-1 ml-2 sm:pt-32">
                    <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
                        <div>
                            <Label value="Email"/>
                            <TextInput 
                                type="email" 
                                placeholder="Email"
                                id="email"
                                style={{borderRadius: "2px"}}
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div>
                            <Label value="Password"/>
                            <TextInput 
                                type="password" 
                                placeholder="********"
                                id="password"
                                style={{borderRadius: "2px"}}
                                onChange={onChangeHandler}
                            />
                        </div>
                            <Button className="rounded-sm bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:bg-gradient-to-r hover:from-red-800 hover:via-red-700 hover:to-red-600"
                            type="submit"
                            >
                                {loading ? (
                                    <>
                                        <Spinner size="sm" />
                                        <span className="pl-2">Loading...</span>
                                    </>
                                ) : "Sign In"}
                            </Button>
                    </form>
                    <div className="flex gap-2 text-sm mt-5">
                        <span>Don't have an account?</span>
                        <Link to={"/sign-up"} className="text-blue-600">Sign Up</Link>
                    </div>
                    {errorMessage && (
                    <Alert className="mt-4" style={{borderRadius: "2px"}} color="failure">{errorMessage}</Alert>
                )}
                </div>
            </div>
        </section>
    )
}
