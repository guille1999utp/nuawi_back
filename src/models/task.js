const { Schema, model } = require('mongoose');

const Task = new Schema({
    title: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        trim: true,
        enum: ['pendiente', 'hecho'],
        default: 'pendiente',
    },
});

Task.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Task', Task);