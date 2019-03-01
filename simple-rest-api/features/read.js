'use strict';

const db = require('../db');

module.exports.getTodo = async (event, context) => {
  const todo_id = event.pathParameters.id;

  try {
    const todo = await db.todo.findOne({
      where: {
        id: todo_id
      },
      attributes: ['id', 'task', 'completed']
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
        error: `There was an error fetching your todo with id: ${todo_id}`
      })
    };
  }
};

module.exports.listTodos = async (event, context) => {
  try {
    const todos = await db.todo.findAll({
      attributes: ['id', 'task', 'completed']
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        todos: todos
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'There are an error fetching your todos'
      })
    };
  }
};
