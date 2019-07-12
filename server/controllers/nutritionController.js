const axios = require('axios')

class NutritionController {

    static getNutrition(req,res,next){
        let {nutrition,food} = req.query
        axios({
            method: "get",
            url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/quickAnswer?q=How much ${nutrition} is in ${food}?`,
            headers: {
                "X-RapidAPI-Key": "783caae55fmsh847910fcf055d06p1dc77ejsne42e1cd53737",
                "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }
        })
            .then(({data})=>{
                console.log('masuk nutrition', data)
                res.status(200).json(data)
            })
            .catch(next)
    }
}

module.exports = NutritionController