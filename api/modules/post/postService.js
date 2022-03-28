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
            return data;
        }

        return data;
    }

    async createOrUpdate(data) {
        return await UserRepository.createOrUpdate({
            "UserEmail": data.UserEmail,
            "PK": 'ACCT_'+data.UserEmail,
            "SK": 'ACCT_'+data.UserEmail,
            "FirstName": data.FirstName,
            "LastName": data.LastName,
            "Addresses":data.Addresses,
            "PhoneNumber":data.PhoneNumber,
            "Gender":data.Gender,
            "DateOfBirth":data.DateOfBirth,
            "Role":data.Role,
            "PasswordHash":data.PasswordHash,
            "IsActive": data.IsActive,
            "Avatar": data.Avatar,
            "Description":data.Description
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