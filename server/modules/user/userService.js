const UserRepository = require(`../user/userRepository`);

class UserService {

    async findByID(PK) {
        const data = await UserRepository.findByID(PK);

        if (data) {
            return data.Item;
        }

        return data;
    }

    async getAll() {
        const data = await UserRepository.getAll();

        if (data) {
            return data.Items;
        }

        return data;
    }

    async create(data) {
        return await UserRepository.create({
            "PK": data.PK
        });
    }

    async update(PK, data) {
        return await UserRepository.update(PK, {
            "Role": data.Role
        });
    }

    async deleteByID(PK) {
        return await UserRepository.deleteByID(PK);
    }

}

module.exports = new UserService()