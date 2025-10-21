# TODO: Fix Wompi Payment Gateway "Firma Inválida" Error

## Frontend Fixes (ModalSales.jsx)
- [ ] Remove unused fields (region, ciudad) from datasend
- [ ] Fix authentication logic: Set nombre_cliente to user's name, apellidos_cliente to "", ensure id_cliente is set when authenticated
- [ ] Verify total calculation consistency (already handled in useEffect)

## Backend Fixes (controller_sales.js)
- [ ] Calculate total from products instead of relying on frontend's valorventa
- [ ] Add logs for signature generation (cadenaFirmada and signature)
- [ ] Verify Wompi keys are production (check .env for WOMPI_INTEGRITY_KEY)

## Testing and Verification
- [ ] Verify Wompi keys (prod vs test) esto es para hacer y probar en laa app ?
