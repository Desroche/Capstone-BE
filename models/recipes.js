const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    }
}, { timestamps: true });

const recipes = mongoose.model('recipe', recipeSchema);

module.exports = recipes;

// Photo field string implies path if file route