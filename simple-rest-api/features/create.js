const db = require('../db');

module.exports.createTodo = async (event, context) => {
  const body = JSON.parse(event.body);
  const { task } = body;

  if (!task) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'The property "task" is required.'
      })
    };
  }

  try {
    const todo = await db.todo.create({
      task: body.task
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        todo: todo
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'There was an error creating your todo'
      })
    };
  }
};
