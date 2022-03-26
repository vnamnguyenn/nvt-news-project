const UserService = require(`../user/userService`);

class UserController {

    async findByID(req, res) {
        const data = await UserService.findByID(req.params.PK)

        res.json(data)
    }

    async getAll(req, res) {
        try {
            const data = await UserService.getAll()
            res.json(data)
        } catch (err) {
            console.error(err);
            res.status(500).json({ err: 'Something went wrong' });
        }

    }

    async createOrUpdate(req, res) {
        const user = req.body;
        const { id } = req.params;
        user.id = id;
        
        const data = await UserService.createOrUpdate(user)

        res.json(data)
    }
    
    async update(req, res) {
        const data = await UserService.update(req.params.id, req.body)
        res.json(data)
    }

    async deleteByID(req, res) {
        await UserService.deleteByID(req.params.PK)
        res.json(`Success`)
    }
    
}

module.exports = new UserController()