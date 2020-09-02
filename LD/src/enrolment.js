const helper = require('./helper');
const enrolmentsTable = helper.getTableName('enrolments');

module.exports = {
    /**
     *Create enrolment
     * */

    async create(event, context) {
        const body = JSON.parse(event.body);
        const id = context.awsRequestId;
        if(!body.studentId || !body.classId)
            return helper.sendResponse('Student ID and Class ID need', 400);
        const result = (await helper.DocumentClient.put({
            TableName: enrolmentsTable,
            Item: {
                enrolmentId: id,
                studentId: body.studentId,
                classId: body.classId,
            }
        }).promise()).Item;

        return helper.sendResponse({result})
    },

    /**
     * Get enrolment
     * */

    async gets() {
        const result = (await helper.DocumentClient.scan({
            TableName: enrolmentsTable
        }).promise()).Items;
        return helper.sendResponse(result)
    },


    /**
     * Update enrolment
     * */

    async update(event) {
        const enrolmentId = event.pathParameters.id;
        const result = (await helper.DocumentClient.update({
            TableName: enrolmentsTable,
            Key: {
                enrolmentId: enrolmentId
            }
        }).promise()).Item;
        return helper.sendResponse(result)
    },

    /**
     * Delete enrolment
     * */

    async delete(event) {
        const enrolmentId = event.pathParameters.id;
        const result = (await helper.DocumentClient.delete({
            TableName: enrolmentsTable,
            Key: {
                enrolmentId: enrolmentId
            }
        }).promise()).Item;
        return helper.sendResponse(result);
    }

};
