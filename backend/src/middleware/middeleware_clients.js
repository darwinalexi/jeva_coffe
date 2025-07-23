import { body, validationResult } from 'express-validator';

export const validatorclientcreate = [
  // ¡OJO! Estás escribiendo mal "identificacion" aquí:
  body('identificacion')
    .notEmpty()
    .withMessage('La identificación es obligatoria'),

  body('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio'),

  body('correo')
    .notEmpty()
    .withMessage('El correo es obligatorio')
    .bail() // Si falla .notEmpty(), no intenta .isEmail()
    .isEmail()
    .withMessage('El correo debe ser válido'),

  body('celular')
    .notEmpty()
    .withMessage('El celular es obligatorio')
    .bail()
    .isInt()
    .withMessage('El celular debe ser un número entero'),

  body('edad')
    .notEmpty()
    .withMessage('La edad es obligatoria')
    .bail()
    .isInt({ min: 18 })
    .withMessage('Debes tener al menos 18 años'),

  // Middleware para manejar los errores de validación
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  }
];
