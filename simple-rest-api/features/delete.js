const db = require('../db');

module.exports.deleteTodo = async (event, context) => {
  const todo_id = event.pathParameters.id;

  try {
    const num_deleted = await db.todo.destroy({
      where: {
        id: todo_id
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        num_deleted: num_deleted
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: `There was an error deleting your todo with id: ${todo_id}`
      })
    };
  }
};
