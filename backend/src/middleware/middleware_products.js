import { body, validationResult } from 'express-validator';

export const validatorproductcreate = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('unidades_disponibles').isInt({ min: 1 }).withMessage('Las unidades deben ser un número entero positivo'),

    body('precio')
    .custom(value => {
      // Reemplazar el punto por un vacío para eliminar los separadores de miles
      const numericValue = parseFloat(value.replace(/\./g, ''));
      if (isNaN(numericValue) || numericValue < 1000) {
        throw new Error('El precio debe ser un número válido o mayor a 1.000');
      }
      return true; // Si la validación pasa
    }),
  // Middleware personalizado para validar imagen
  (req, res, next) => {
    if (!req.files) {
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
  body('unidades_disponibles').isInt({ min: 1 }).withMessage('Las unidades deben ser un número entero positivo'),
  
  // Validar y convertir el precio
  body('precio')
    .custom(value => {
      // Reemplazar el punto por un vacío para eliminar los separadores de miles
      const numericValue = parseFloat(value.replace(/\./g, ''));
      if (isNaN(numericValue) || numericValue < 1000) {
        throw new Error('El precio debe ser un número válido o mayor a 1.000');
      }
      return true; // Si la validación pasa
    }),
  // Validar errores de campos
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  }
];
