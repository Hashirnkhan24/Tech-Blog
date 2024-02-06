import Post from '../models/post.model.js'
export const create = async(req, res, next) => {

    if(!req.user.isAdmin) {
        return res.status(401).json({
            message : "You must be an admin"
        })
    }
    if(!req.body.title || !req.body.content) {
        return res.status(401).json({
            message : "Please provide all the necessary fields"
        })
    }

    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9]/g, '')
    const newPost = new Post({
        ...req.body, 
        slug, 
        userId: req.user.id
    })

    const savedPost = await newPost.save()
    res.status(201).json(savedPost)
}