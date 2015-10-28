var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('underscore');

var CHANGE_EVENT = 'change';


var _todos = {};

function create(text) {
    // Hand waving here -- not showing how this interacts with XHR or persistent
    // server-side storage.
    // Using the current timestamp + random number in place of a real id.
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _todos[id] = {
        id: id,
        complete: false,
        text: text
    };
}

var todo_mixin = _.extend({}, EventEmitter.prototype);

var TodoStore = _.extend(todo_mixin, {
    getAll: function() {
        return _todos;
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function() {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

//var TodoStore = assign({}, EventEmitter.prototype, {
//    getAll: function() {
//        return _todos;
//    },
//    emitChange: function() {
//        this.emit(CHANGE_EVENT);
//    },
//
//    addChangeListener: function(callback) {
//        this.on(CHANGE_EVENT, callback);
//    },
//
//    removeChangeListener: function() {
//        this.removeListener(CHANGE_EVENT, callback);
//    }
//
//});


AppDispatcher.register(function(action) {
    var text;

    switch(action.actionType) {
        case 'CREATE_TODO':
            text = action.text.trim();
            if (text !== '') {
                create(text);
                TodoStore.emitChange();
            }
            break;

        default:
        // no op
    }
});

module.exports = TodoStore;