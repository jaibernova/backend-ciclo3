const express = require('express');
const router = express.Router();
const authService = require('../services/auth.service')
const User = require("../models/user");
const Task = require("../models/products");


router.get('/', async (req, res) => {
  const tasks = await User.find();

  res.json(tasks);
});

//crea una nueva entrada en la base de datos de acuerto al Schema definido en elarchivo task.js
router.post('/productos', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.json({ status: 'tarea guardada' });
  } catch (error) {
    res.send(error);
  }
});

router.get('/productos', async (req, res) => {
  const tasks = await Task.find();

  res.json(tasks);
});




//envia una peticion a el frontend para asi editar los datos
router.get('/:id', async (req, res) => {
  const task = await User.findById(req.params.id);
  res.json(task);
});

//envia una peticion a el frontend para asi editar los datos
router.get('/productos/:id', async (req, res) => {
  const data = await Task.findById(req.params.id);
  res.json(data);

});



//metodo para actualizar un registro de la base de datos
router.put('/productos/:id', async (req, res) => {

  const newTask = req.body;

  //obtiene el id por consola
  //console.log(req.params.id);
  await Task.findByIdAndUpdate(req.params.id, newTask);
  res.json({ status: 'actualizado' });

});


//metodo para actualizar un registro de la base de datos
router.put('/:id', async (req, res) => {
  //const { title, description } = req.body;
  // const newTask = { title, description };
  const newTask = req.body;
  //obtiene el id por consola
  //console.log(req.params.id);
  await User.findByIdAndUpdate(req.params.id, newTask);
  res.json({ status: 'actualizado' });

});



//borra un registro en la base
router.delete('/:id', async (req, res) => {
  await User.findByIdAndRemove(req.params.id);
  res.json({ status: 'eliminado' });

});


router.delete('/productos/:id', async (req, res) => {
  await Task.findByIdAndRemove(req.params.id);
  res.json({ status: 'eliminado' });

});




//----------- Auth routes ------------
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json('User and password required')
    }
    let token = await authService.login(req.body)
    if (token) {
      res.status(token.code).json(token)
    } else {
      res.send('Error')
    }
  } catch (error) {
    res.send(error);
  }
})

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    const userSaved = await authService.register(user);
    res.send(userSaved);
  } catch (error) {
    res.send(error);
  }
})

module.exports = router;