const controller = {};

controller.list = (req, res) => {
    res.render('usuarios');
    /*req.getConnection((err, conn) =>{
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
    });*/
}

controller.save = (req, res) => {
    console.log(req.body);
    const data = req.body;
    console.log("-------------");
    console.log(data);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO user set ?',[data], (err, rows) => {
            console.log(rows);
            //res.send('works');
            return res.status(200).send({
                rows
            });
        });
    });
}

controller.login = (req, res) => {
  //  console.log(req.body);
    //console.log(req.body.username);

    req.getConnection((err, conn) =>{

        //SELECT column1, column2, ...FROM table_name WHERE condition;
        conn.query('Select id, username, password FROM user where username = ?', [req.body.username],(err, usuarios) => {
            if(err)
            {
                res.json(err);
            }
            console.log(usuarios);
            let ok = "ok";
            if(usuarios[0].username == req.body.username && usuarios[0].password == req.body.password)
            {
                let user_id = usuarios[0].id;
                console.log("entro a la condicion de cristian");
                return res.status(200).send({ user_id });
            }
            else
            {
                console.log('Contraseña Error');
                return res.status(400).send('Contraseña Erronea');
            }

        });
     });

}



module.exports = controller;