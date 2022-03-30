const PostService = require(`../posts/postService`);

class PostController {

    async findByID(req, res) {
        const data = await PostService.findByID(req.params.PK)

        res.json(data)
    }

    async getAll(req, res) {
        try {
            const data = await PostService.getAll()
            res.json(data)
        } catch (err) {
            console.error(err);
            res.status(500).json({ err: 'Something went wrong' });
        }

    }

    async create(req, res) {
        const data = await PostService.create(req.body)

        res.json(data)
    }
    
    async update(req, res) {
        const data = await PostService.update(req.params.id, req.body)
        res.json(data)
    }

    async deleteByID(req, res) {
        await PostService.deleteByID(req.params.PK)
        res.json(`Success`)
    }
    
}

module.exports = new PostController()