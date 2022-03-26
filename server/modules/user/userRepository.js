const db = require(`../../config/dynamoDB`);
const {v4: uuidv4} = require('uuid');

class UserRepository {
    constructor() {
        this.tableName = 'Blog';
    }

    async findByID(PK) {
        const params = {
            TableName: this.tableName,
            Key: {
                "PK": PK,
                "SK": "ACCT#vn13012000@gmail.com"
            },
        };

        return await db.get(params).promise();
    }

    async getAll() {
        const params = {
            TableName: this.tableName,
            IndexName: "AccountIndex",
            Limit: "2"
        };
        return await db.scan(params).promise();
    }

    async create(data) {
        const params = {
            TableName: this.tableName,
            Item: {
                "PK": data.PK,
                "SK": uuidv4(),
                "Role":"Admin"
            },
        };

        await db.put(params).promise();

        return params.Item;
    }

    async update(PK, data) {
        const params = {
            TableName: this.tableName,
            Key: {
                "PK": PK,
                "SK":"5f0d1623-5c16-43aa-9eaa-5e78c932c8e2"
            },
            UpdateExpression: `set #Role = :Roles`,
            ExpressionAttributeNames: {
                "#Role": "Role"
            },
            ExpressionAttributeValues: {
                ":Roles": data.Role,
            },
            ReturnValues: `UPDATED_NEW`,
        };

        const update = await db.update(params).promise();

        return update.Attributes;
    }

    async deleteByID(PK) {
        const params = {
            TableName: this.tableName,
            Key: {
                "PK":PK,
                "SK":"ACCT#vn13012000@gmail.com"
            },
        };

        return await db.delete(params).promise();
    }
}

module.exports = new UserRepository();