import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { registerValidation, loginValidation, postCreateValidation } from './validations/validations.js'
import { UserController, PostController } from './controllers/controllers.js'
import { checkAuth, handleValidationErrors } from './utils/utils.js';



mongoose
   .connect('mongodb+srv://user:Mamamia1980!@cluster0.xuvm5v0.mongodb.net/blog?retryWrites=true&w=majority')
   .then(() => console.log('db ok'))
   .catch((err) => console.log('db error', err));
   
const app = express();

const storage = multer.diskStorage({
   destination: (_, __, cb) => {
      cb(null, 'uploads');
   },
   filename: (_, file, cb) => {
      cb(null, file.originalname);
   },
   
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'))

app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
   res.json({
      url: `/uploads/${req.file.originalname}`
   })
});

app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.get('/posts/:id', PostController.getOne);
app.get('/posts', PostController.getAll);


app.listen(4444, (err) => {
   if (err) {
      return console.log('err');
   }
   console.log('server ok');
})