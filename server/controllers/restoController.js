const axios= require('axios')

class restoController{

    static getAllResto(req, res, next){
        axios({
            method: 'get',
            url: `https://developers.zomato.com/api/v2.1/search?entity_type=city&q=${req.params.city}`,
            headers: {
              'user-key': 'f5f6d3f9422ef261b4fb097efee1973c'
            }
          })
            .then(({data}) => {
              res.status(200).json(data)
            })
      .catch(next)
    }

    static getDetail(req, res, next){
        axios({
            method: 'get',
            url: `https://developers.zomato.com/api/v2.1/search?entity_id=${req.params.id}`,
            headers: {
              'user-key': 'f5f6d3f9422ef261b4fb097efee1973c'
            }
          })
            .then(({data}) => {
              res.status(200).json(data)
            })
      .catch(next)
    }
}

module.exports= restoController