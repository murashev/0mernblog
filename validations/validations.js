import { body } from 'express-validator'

export const registerValidation = [
   body('email', 'неверный формат почты').isEmail(),
   body('password', 'пароль должен быть больше пяти символов').isLength({ min: 5 }),
   body('fullName', 'укажите имя').isLength({ min: 2 }),
   body('avatarUrl', 'неверная ссылка на картинку').optional().isURL(),
];
export const loginValidation = [
   body('email', 'неверный формат почты').isEmail(),
   body('password', 'пароль должен быть больше пяти символов').isLength({ min: 5 }),
];
export const postCreateValidation = [
   body('title', 'введите заголовок').isLength({min: 3}).isString(),
   body('text', 'введите текст статьи').isLength({min: 10}).isString(),
   body('tags', 'неверный формат тегов').optional().isArray(),
   body('imageUrl', 'неверная ссылка на картинку').optional().isString(),
];