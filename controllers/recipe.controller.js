const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');

module.exports.newRecipe = (req, res, next) => {
    if (req._id != req.body.authorId) {
        console.log(req._id);
        console.log(req.body.authorId);
        res.status(401).send('Not authorized to add recipe for this user');
    }
    else {
        var recipe = new Recipe();
        recipe.authorId = req.body.authorId;
        recipe.title = req.body.title;
        recipe.description = req.body.description;
        recipe.tags = req.body.tags;
        recipe.ingredients = req.body.ingredients;
        recipe.steps = req.body.steps;
        recipe.save((err, doc) => {
            if (!err)
                res.status(200).json({ success: true });
            else {
                res.status(400).json({ success: false });
                console.log(err);
            }
        })
    }
}

module.exports.getRecipes = (req, res, next) => {
    Recipe.find({ authorId: req._id }, (err, doc) => {
        if (err || !doc)
            return res.status(404).send("No Recipes Found.");
        else
            return res.status(200).json(doc);
    })
}

module.exports.deleteRecipe = (req, res, next) => {
    Recipe.findOne({ _id: req.body._id }, (err, doc) => {
        if (err || !doc)
            return res.status(404).send("Recipe does not exist");
        else {
            if (req._id != doc.authorId)
                return res.status(401).send("Not authorized to delete this.");
            else {
                Recipe.deleteOne({ _id: req.body._id }, (err) => {
                    if (err)
                        return res.status(400).send("Unable to delete, try again later");
                    else
                        return res.status(200).send("Recipe successfully deleted");
                });
            }
        }
    });
}

module.exports.updateRecipe = (req, res, next) => {
    Recipe.findOne({ _id: req.body._id }, (err, doc) => {
        if (err || !doc)
            return res.status(404).send("Recipe does not exist");
        else {
            if (req._id != doc.authorId)
                return res.status(401).send("Not authorized to update this.");
            else {
                doc.set(req.body);
                doc.save((err, doc) => {
                    if (err)
                        return res.status(400).send("Unable to update, try again later");
                    else
                        return res.status(200).send("Recipe successfully updated");
                })
            }
        }
    });
}

/*
For full match, incoming JSON will look like:
    {
        "field" : "value"
    }

For partial match, should look like:
    {
	    "field" : {
            "$regex":"val",
            "$options":"i"
	    }
    }

For ingredient search, should look like:

    {
        "ingredients.ingredient" : {

                    "$regex": "Wat",
                    "$options":"i"
        }
    }
*/
module.exports.search = (req, res, next) => {
    Recipe.find(req.body, (err, doc) => {
        if (err || !doc)
            return res.status(404).send("No Recipes Found.");
        else
            return res.status(200).json(doc);
    })
}
