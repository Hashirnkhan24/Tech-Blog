import z from 'zod';

const signupValidator = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string().min(6)
})

export { signupValidator }