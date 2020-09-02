const helper = require('./helper');
const contactsTable = helper.getTableName('contacts');

module.exports = {
    /**
     *Create contact
     * */

    async create(event, context) {
        const body = JSON.parse(event.body);
        const id = context.awsRequestId;
        if(!body.studentId)
            return helper.sendResponse('Student ID needed', 400);
        const result = (await helper.DocumentClient.put({
            TableName: contactsTable,
            Item: {
                contactId: id,
                studentId: body.studentId,
                phoneNumber: body.phoneNumber,
                email: body.email,
                address: body.address
            }
        }).promise()).Item;

        return helper.sendResponse({result})
    },

    /**
     * Get class
     * */

    async gets() {
        const result = (await helper.DocumentClient.scan({
            TableName: contactsTable
        }).promise()).Items;
        return helper.sendResponse(result)
    },


    /**
     * Update class
     * */

    async update(event) {
        const contactId = event.pathParameters.id;
        const result = (await helper.DocumentClient.update({
            TableName: contactsTable,
            Key: {
                contactId: contactId
            }
        }).promise()).Item;
        return helper.sendResponse(result)
    },

    /**
     * Delete class
     * */

    async delete(event) {
        const contactId = event.pathParameters.id;
        const result = (await helper.DocumentClient.delete({
            TableName: contactsTable,
            Key: {
                contactId: contactId
            }
        }).promise()).Item;
        return helper.sendResponse(result);
    }

};
