const db = require('../db');

module.exports.updateTodo = async (event, context) => {
  const todo_id = event.pathParameters.id;

  const body = JSON.parse(event.body);

  try {
    const resArr = await db.todo.update(body, {
      where: {
        id: todo_id
      },
      returning: true
    });
    console.log(resArr);
    const [rowsAffected, todoArr] = resArr;
    console.log(
      `${rowsAffected} row(s) were updated with this obj: ${JSON.stringify(
        body
      )}`
    );
    return {
      statusCode: 200,
      body: JSON.stringify({
        todo: todoArr[0]
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: `There was an error updating todo id: ${todo_id}`
      })
    };
  }
};
