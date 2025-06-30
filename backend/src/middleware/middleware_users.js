import { body, validationResult } from "express-validator";

export const validationusercreate = [
  body('identificacion')
    .notEmpty().withMessage('La identificación es obligatoria')
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

  // Validar que la imagen exista
  (req, res, next) => {
    if (!req.file) {
      return res.status(404).json({
        errores: [{ msg: 'La imagen es obligatoria', param: 'imagen' }]
      });
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
  
  body('clave')
    .notEmpty().withMessage('La clave es obligatoria'),
  
  body('tipo')
    .notEmpty().withMessage('El tipo de usuario es obligatorio'),


  // Validar si hay errores
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
   console.log("BODY:", req.body);
        return res.status(400).json({ errores: errores.array() });
    }
    next();
  }
];