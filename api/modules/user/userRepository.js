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
                PK : PK,
                SK : "f2d13e5f-b67b-4be0-a839-a28019474599"
            },
        };

        return await db.get(params, function(err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            }
        }).promise();
    }

    async getAll() {
        const params = {
            TableName: this.tableName,
            "FilterExpression": "begins_with(#8f150, :8f150)",
            "ExpressionAttributeValues": {
              ":8f150": "ACCT_"
            },
            "ExpressionAttributeNames": {
              "#8f150": "SK"
            }
        };
        return await db.scan(params).promise();
    }

    async createOrUpdate(data) {
        const params = {
            TableName: this.tableName,
            Item: {
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