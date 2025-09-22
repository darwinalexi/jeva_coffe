import { body, validationResult } from 'express-validator';

export const validatorproductcreate = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('unidades_disponibles').isInt({ min: 1 }).withMessage('Las unidades deben ser un número entero positivo'),
    body('precio')
    .custom(value => {
      const numericValue = parseFloat(value.replace(/\./g, ''));
      if (isNaN(numericValue) || numericValue < 1000) {
        throw new Error('El precio debe ser un número válido o mayor a 1.000');
      }
      return true; 
    }),
    body('estado') .notEmpty() .withMessage('Se debe poner un estado para poder registrar un producto'),
    body('usuario_id') .notEmpty() .withMessage('Si registras un producto debes ingresar un id de usuario de jeva_coffe'), 
    body('descripcion') .notEmpty().withMessage('Debes ingresar una descripcion obligatoria del producto').isString(),
    body('cantidad') .notEmpty()  .withMessage('Se debe ingresar una Cantidad de valida  Ej: 500g').isString(),
    body('tueste') .notEmpty().withMessage('Se debe ingresar un tueste') .isString(),,
    body('variedad') .notEmpty() .withMessage('Se debe ingresar una variedad').isString(),
    body('aroma') .notEmpty().withMessage('Se debe ingresar un aroma') .isString(),
    body('sabor') .notEmpty().withMessage('Se debe ingresar un sabor') .isString(),,
    body('cuerpo') .notEmpty() .withMessage('Se debe ingresar un cuerpo').isString(),
    (req, res, next) => {
    if (!req.files) {
      return res.status(400).json({
        errores: [{ msg: 'La imagen es obligatoria', param: 'imagen' }]
      });
    }
    next();
  },

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
  body('precio')
    .custom(value => {
      const numericValue = parseFloat(value.replace(/\./g, ''));
      if (isNaN(numericValue) || numericValue < 1000) {
        throw new Error('El precio debe ser un número válido o mayor a 1.000');
      }
      return true; 
    }),

    body('estado') .notEmpty() .withMessage('Se debe poner un estado para poder  actualizar un producto'),
    body('usuario_id') .notEmpty() .withMessage('Si actualizas un producto debes ingresar un id de usuario de jeva_coffe'), 
    body('descripcion') .notEmpty().withMessage('Debes ingresar una descripcion obligatoria del producto') .isString(),
    body('cantidad') .notEmpty() .withMessage('Se debe ingresar una Cantidad de valida  Ej: 500g').isString(),
    body('tueste') .notEmpty().withMessage('Se debe ingresar un tueste').isString(),
    body('variedad') .notEmpty().withMessage('Se debe ingresar una variedad').isString(),
    body('aroma') .notEmpty().withMessage('Se debe ingresar un aroma').isString(),
    body('sabor') .notEmpty().withMessage('Se debe ingresar un sabor').isString(),
    body('cuerpo') .notEmpty().withMessage('Se debe ingresar un cuerpo').isString(),
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  }
];
