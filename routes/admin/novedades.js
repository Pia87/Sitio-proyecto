var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel')

router.get('/', async function(req, res, next) {
    var novedades= await novedadesModel.getNovedades();

    res.render('admin/novedades',{
        layout:'admin/layout',
        persona:req.session.nombre, novedades

    });
  });

  /*Para eliminar una novedad*/
  router.get('/eliminar/:id', async(req, res, next) =>{
    const id =req.params.id;
    await novedadesModel.deleteNovedadById(id);
    res.redirect('/admin/novedades')
  }) //cierra get de eliminar

router.get('/agregar', (req, res, next)=> {
    res.render('admin/agregar',{ //agregrar.hbs (dentro del admin)
        layout: 'admin/layout'
    }); //cierra render
});

router.post('/agregar', async (req, res, next) =>{
    try{
        //console.log(req.body)
        if(req.body.titulo !="" && req.body.subtitulo !="" &&
        req.body.cuerpo !=""){
            await novedadesModel.insertNovedad(req.body);
            res.redirect('/admin/novedades')
        } else{
            res.render('admin/agregar',{
                layout: 'admin/layout',
                error:true, message:'Todos los campos son requeridos'
            })
        }
    } catch (error){
        console.log(error)
        res.render('admin/agregar',{
            layout: 'admin/layout',
            error:true, message: 'No se cargó la novedad'
        });
    }
});

router.get('/modificar/:id', async (req, res, next)=>{
    var id = req.params.id;
    var novedad = await novedadesModel.getNovedadById(id);

    res.render('admin/modificar',{
        layout:'admin/layout', novedad
    })
})

/*metodo post- info que viene desde el formulario*/
router.post('/modificar', async (req, res, next) => {
    try{
        var obj = {
            titulo:req.body.titulo,
            subtitulo:req.body.subtitulo,
            cuerpo: req.body.cuerpo
}
await novedadesModel.modificarNovedadById(obj, req.body.id);
res.redirect('/admin/novedades');
    }
    catch(error){
        console.log(error)
        res.render('admin/modificar',{
            layout:'admin/layout',
            error:this.true, message: 'No se modificó la novedad'
        })
    }
});
/* cierra post*/
  module.exports = router;