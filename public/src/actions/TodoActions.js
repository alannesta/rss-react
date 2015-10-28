var AppDispatcher = require('../dispatcher/AppDispatcher');

var TodoActions = {

  /**
   * @param  {string} text
   */
  create: function(text) {
    AppDispatcher.dispatch({
      actionType: 'CREATE_TODO',
      text: text
    });
  }
};

module.exports = TodoActions;
