const mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Author is required'
    },
    title: {
        type: String,
        required: 'Title is required.'
    },
    description: {
        type: String,
    },
    tags: {
        type: [String]
    },
    ingredients: {
        type: [{
            amount: String,
            ingredient: String
        }],
        required: 'Ingredients are required'
    },
    steps: {
        type: [String],
        required: 'Instructions are required'
    }
});

mongoose.model('Recipe', recipeSchema);