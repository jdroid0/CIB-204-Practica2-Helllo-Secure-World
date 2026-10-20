import { Buffer } from "node:buffer";
/**
 * Controles simulados para la práctica Hello Secure World.
 * No procesan pagos reales ni acceden a servicios externos.
 */

// R-01: Idempotencia de pagos
export function createPaymentProcessor() {
  const processed = new Map();

  return function processPayment(idempotencyKey, amount) {
    if (!idempotencyKey || !Number.isFinite(amount) || amount <= 0) {
      throw new Error('Solicitud de pago inválida');
    }

    if (processed.has(idempotencyKey)) {
      return {
        ...processed.get(idempotencyKey),
        repeated: true,
      };
    }

    const result = {
      idempotencyKey,
      amount,
      status: 'processed',
    };

    processed.set(idempotencyKey, result);

    return { ...result, repeated: false };
  };
}

// R-02: Validación del contenido de comprobantes
export function validateReceipt(filename, content) {
  if (!filename.toLowerCase().endsWith('.pdf')) {
    return false;
  }

  if (!Buffer.isBuffer(content) || content.length < 5) {
    return false;
  }

  return content.subarray(0, 5).toString() === '%PDF-';
}

// R-06: Denegación ante fallo de autorización
export function authorizePayment(permissionServiceAvailable, authorized) {
  if (!permissionServiceAvailable) {
    return false;
  }

  return authorized === true;
}
