import {body, validationResult} from "express-validator";


export const validationsales = [
  body('productos')
    .notEmpty().withMessage('Se debe Añadir un producto para comprar'),
  body('fecha_venta')
    .notEmpty().withMessage('La fecha de venta es obligatoria')
    .isDate().withMessage('La fecha de venta debe ser una fecha válida'),
  body('valorventa')
    .notEmpty().withMessage('El valor de venta es obligatorio')
    .isNumeric().withMessage('El valor de venta debe ser un número válido'),
    body('celular')
    .notEmpty().withMessage('El celular es obligatorio')
    .isNumeric().withMessage('El celular debe ser un número válido'),
    body('correo')
    .notEmpty().withMessage('El correo es obligatorio')
    .isEmail().withMessage('El correo debe ser un email válido'),

      (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  }
]