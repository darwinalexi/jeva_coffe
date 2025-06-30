import { body, validationResult } from 'express-validator';

export const validatorproductcreate = [
  body('id').notEmpty().withMessage('El ID es obligatorio'),
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('unidades_disponibles').isInt({ min: 1 }).withMessage('Las unidades deben ser número entero positivo'),
  body('precio').isFloat({ min:1000 }).withMessage('El precio debe ser un número válidoor mayor a 1000'),

  // Middleware personalizado para validar imagen
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({
        errores: [{ msg: 'La imagen es obligatoria', param: 'imagen' }]
      });
    }
    next();
  },

  // Validar errores de campos
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  }
];

export const validatorproductupdate = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('unidades_disponibles').isInt({ min: 1 }).withMessage('Las unidades deben ser número entero positivo'),
  body('precio').isFloat({ min:1000 }).withMessage('El precio debe ser un número válidoor mayor a 1000'),

  // Middleware personalizado para validar imagen
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({
        errores: [{ msg: 'La imagen es obligatoria', param: 'imagen' }]
      });
    }
    next();
  },

  // Validar errores de campos
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  }
];
