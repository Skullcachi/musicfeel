const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) =>{
       conn.query('Select * FROM usuario', (err, usuarios) => {
           if(err)
           {
               res.json(err);
           }
           console.log(usuarios);
           res.render('usuarios', {
               data: usuarios
           })
       });
    });
}

controller.save = (req, res) => {
    console.log(req.body);
    const data = req.body;
    console.log("-------------");
    console.log(data);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO usuario set ?',[data], (err, usuario) => {
            console.log(usuario);
            //res.send('works');
            return res.status(200).send({
                usuario
            });
        });
    });
}


module.exports = controller;