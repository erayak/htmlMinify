var express = require('express');
var router = express.Router();
var fs = require('fs');
var Minimize = require('minimize')
  , minimize = new Minimize({ comments: true });

/* GET home page. */
router.get('/', (request, response, next) => {
  response.render('index');
});

// Html Minify
router.post('/',( request, response, next ) => {

    var name = request.body.name;
    var file = request.files.file;

    if( !( name === '' || file === '' ) )
    {
        file.mv(
          `./public/file/${name}.html`, 
          ( error ) => {

              if( !error )
              {
                  fs.readFile(`./public/file/${name}.html`, (err, data) => {
                  
                      minimize.parse(
                        `${data}`,
                        ( error, data ) => {
                            
                            if( !error )
                              fs.writeFile(`./public/file/${name}.html`, `${data}`, (err) => {
                                    response.render('index',{
                                        status:1,
                                        name:name
                                    });
                              });
                            else
                                response.redirect('/');
                        }
                      );
                  
                  });
              }
              else
                  response.redirect('/');

          }
        );
    }
    else
      response.redirect('/');
    

});

module.exports = router;
