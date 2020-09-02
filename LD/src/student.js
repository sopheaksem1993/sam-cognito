const helper = require('./helper');
const studentsTable = helper.getTableName('students');

module.exports = {
  /**
   *Create student
   * */

  async create(event, context) {
      const body = JSON.parse(event.body);
      const id = context.awsRequestId;
      if(!body.name)
          return helper.sendResponse(id, 400);
      const result = (await helper.DocumentClient.put({
          TableName: studentsTable,
          Item: {
              studentId: id,
              name: body.name,
              grade: body.grade,
              sex: body.sex,
              hobby: body.hobby,
          }
      }).promise()).Item;

      return helper.sendResponse({result})
  },

  /**
   * Get student
   * */

  async gets() {
      const result = (await helper.DocumentClient.scan({
          TableName: studentsTable
      }).promise()).Items;
      return helper.sendResponse(result)
  },


  /**
   * Update student
   * */

  async update(event) {
      const studentId = event.pathParameters.id;
      const result = (await helper.DocumentClient.update({
          TableName: studentsTable,
          Key: {
            studentId: studentId
          }
      }).promise()).Item;
      return helper.sendResponse(result)
  },

  /**
   * Delete student
   * */

  async delete(event) {
      const studentId = event.pathParameters.id;
      const result = (await helper.DocumentClient.delete({
          TableName: studentsTable,
          Key: {
              studentId: studentId
          }
      }).promise()).Item;
      return helper.sendResponse(result);
  }

};
