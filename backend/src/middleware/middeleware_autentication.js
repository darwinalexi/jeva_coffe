import {body, validationResult} from "express-validator"

export const Validationlogin=[
    body('correo').notEmpty().isEmail() .withMessage('Se require un correo y que sea valido'),
    body('clave') .notEmpty().isLength({min: 7 }) .withMessage('se requiere poner una clave'),

(req, res, next)=>{
    const errores= validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }
    next();
}
];

export const ValidationEmail=[
    body('correo') .notEmpty() .isEmail().withMessage('Debres ingresar un correo valido'),

    (req, res, next)=>{
            const errores= validationResult(req);
            if (!errores.isEmpty()) {
                return res.status(400).json({errores: errores.array()});
            }
            next();
    }
]

export const ValidationChangepasword=[
    body('correo') .notEmpty() .isEmail() .withMessage('Se requiere el correo'),
    body('codigo') .notEmpty() .withMessage('No proporcionaste el codigo'),
    body('clave') .notEmpty() .withMessage('Se requiere que proporciones una clave nueva') .isLength({min: 7}) .withMessage('Debe temner minimo 7 caracteres'),
    (req, res, next)=>{

        const errores= validationResult(req);
        
        if (!errores.isEmpty()) {
            return res.status(400).json({errores:errores.array()});
        }
        next();
    }
];