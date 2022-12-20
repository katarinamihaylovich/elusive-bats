const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const entrySchema = new Schema(
    {
        entryText: {
            type: String,
            required: 'You must type something!',
            minlength: 1,
            maxlength: 600
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Entry = model('Entry', entrySchema);

module.exports = Entry;