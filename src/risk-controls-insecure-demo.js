/**
 * SIMULACIÓN EDUCATIVA INTENCIONALMENTE INSEGURA.
 * No procesa pagos reales ni archivos de usuarios.
 * No utilizar en producción.
 */

// R-01: Procesa nuevamente cada solicitud, incluso si se repite.
export function createInsecurePaymentProcessor() {
  let processingCount = 0;

  return function processPayment(idempotencyKey, amount) {
    processingCount += 1;

    return {
      idempotencyKey,
      amount,
      processingCount,
      status: 'processed',
    };
  };
}

// R-02: Confía solamente en la extensión del archivo.
export function insecureValidateReceipt(filename) {
  return filename.toLowerCase().endsWith('.pdf');
}

// R-06: Autoriza cuando el servicio de permisos no responde.
export function insecureAuthorizePayment(serviceAvailable, authorized) {
  if (!serviceAvailable) {
    return true;
  }

  return authorized === true;
}
