import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex flex-col p-3  justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className=" flex-1">
            <img src="https://img.freepik.com/free-vector/hand-drawn-flat-design-api-illustration_23-2149365021.jpg?w=740&t=st=1707315286~exp=1707315886~hmac=32bebfbf543de14d30a236b010b903313b07ebc75f37423db220c5e995ba2f0a" />
        </div>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Want to learn more about Tech?
            </h2>
            <p className='text-gray-500 my-2'>
                Checkout Coding Tales
            </p>
            <Button  className='rounded-tl-xl rounded-sm bg-gradient-to-r from-blue-800 via-blue-600 to-blue-700'>
                <a href="https://codingtales.hashnode.dev/" target='_blank' rel='noopener noreferrer'>
                    Coding Tales
                </a>
            </Button>
        </div>
    </div>
  )
}