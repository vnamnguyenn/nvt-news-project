const UserService = require(`../user/userService`);

class UserController {

    async findByID(req, res) {
        const data = await UserService.findByID(req.params.PK)

        res.json(data)
    }

    async getAll(req, res) {
        const data = await UserService.getAll()

        res.json(data)
    }

    async create(req, res) {
        const data = await UserService.create(req.body)

        res.json(data)
    }
    
    async update(req, res) {
        const data = await UserService.update(req.params.PK, req.body)
        res.json(data)
    }

    async deleteByID(req, res) {
        await UserService.deleteByID(req.params.PK)

        res.json(`Success`)
    }
    
}

module.exports = new UserController()