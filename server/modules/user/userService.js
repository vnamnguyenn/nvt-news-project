const UserRepository = require(`../user/userRepository`);

class UserService {

    async findByID(PK) {
        const data = await UserRepository.findByID(PK);

        if (data) {
            return data.Item;
        }

        return data;
    }

    async create(data) {
        return await UserRepository.create({
            SK: data.SK
        });
    }

    async update(UserID, data) {
        return await UserRepository.update(UserID, {
            Username: data.Username
        });
    }

    async deleteByID(UserID) {
        return await UserRepository.deleteByID(UserID);
    }

}

module.exports = new UserService()