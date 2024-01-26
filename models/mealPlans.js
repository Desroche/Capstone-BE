const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Recipes = require('./recipe');
const Users = require('./users');

const mealPlanSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dates: {
        type: String,
        required: true
    },
    meals: {
        type: [{
            name: {
                type: String,
                required: true
            },
            recipe: Recipes,
            required: true
        }],
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: Users,
            required: true
        }
    }
}, { timestamps: true });

const mealPlans = mongoose.model('mealplan', mealPlanSchema);

module.exports = mealPlans;
