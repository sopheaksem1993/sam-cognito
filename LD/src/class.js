const helper = require('./helper');
const classesTable = helper.getTableName('classes');

module.exports = {
    /**
     *Create class
     * */

    async create(event, context) {
        const body = JSON.parse(event.body);
        const id = context.awsRequestId;
        if(!body.title)
            return helper.sendResponse('Class title needed', 400);
        const result = (await helper.DocumentClient.put({
            TableName: classesTable,
            Item: {
                classId: id,
                title: body.title,
                description: body.description,
            }
        }).promise()).Item;

        return helper.sendResponse({result})
    },

    /**
     * Get class
     * */

    async gets() {
        const result = (await helper.DocumentClient.scan({
            TableName: classesTable
        }).promise()).Items;
        return helper.sendResponse(result)
    },


    /**
     * Update class
     * */

    async update(event) {
        const classId = event.pathParameters.id;
        const result = (await helper.DocumentClient.update({
            TableName: classesTable,
            Key: {
                classId: classId
            }
        }).promise()).Item;
        return helper.sendResponse(result)
    },

    /**
     * Delete class
     * */

    async delete(event) {
        const classId = event.pathParameters.id;
        const result = (await helper.DocumentClient.delete({
            TableName: classesTable,
            Key: {
                classId: classId
            }
        }).promise()).Item;
        return helper.sendResponse(result);
    }

};
