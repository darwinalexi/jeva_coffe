import { body, validationResult } from "express-validator";

export const validationusercreate = [
  body('identificacion')
    .notEmpty().withMessage('La identificación es obligatoria')
    .isNumeric() .withMessage('Debe ser numerico y no mayor a 12')
    .isLength({ max:12 }).withMessage('Debe  no ser mayor a 12')
    .isInt({ min: 1000000 }).withMessage('La identificación debe ser numérica y de mínimo 7 dígitos'),

  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio'),

  body('correo')
    .notEmpty().withMessage('El correo es obligatorio')
    .isEmail().withMessage('Debe ser un correo válido'),

  body('clave')
    .notEmpty().withMessage('La clave es obligatoria'),

  body('tipo')
    .notEmpty().withMessage('El tipo de usuario es obligatorio'),

  // Validar si hay imagen, si no hay, asignar imagen por defecto
  (req, res, next) => {
    if (!req.file) {
      // Simular archivo subido para que el controlador lo trate igual
      req.file = {
        filename: "profile_default.jpeg"
      };
    }
    next();
  },

  // Validar si hay errores
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  }
];





export const validationuserupdate = [


  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio'),

  body('correo')
    .notEmpty().withMessage('El correo es obligatorio')
    .isEmail().withMessage('Debe ser un correo válido'),

  body('tipo').notEmpty().withMessage('El tipo de usuario es obligatorio'),
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  }
];
