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
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO usuario set ?',[data], (err, usuario) => {
            console.log(usuario);
            res.send('works');
        });
    });
}


module.exports = controller;