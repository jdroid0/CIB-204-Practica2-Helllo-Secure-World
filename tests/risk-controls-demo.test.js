import { Buffer } from "node:buffer";
import { describe, expect, it } from 'vitest';
import {
  createPaymentProcessor,
  validateReceipt,
  authorizePayment,
} from '../src/risk-controls-demo.js';

describe('R-01: Idempotencia de pagos', () => {
  it('procesa una solicitud válida', () => {
    const processPayment = createPaymentProcessor();
    const result = processPayment('pago-001', 100);

    expect(result.status).toBe('processed');
    expect(result.repeated).toBe(false);
  });

  it('identifica un reintento sin duplicar el procesamiento', () => {
    const processPayment = createPaymentProcessor();

    processPayment('pago-001', 100);
    const retry = processPayment('pago-001', 100);

    expect(retry.repeated).toBe(true);
  });

  it('rechaza montos inválidos', () => {
    const processPayment = createPaymentProcessor();

    expect(() => processPayment('pago-002', -50)).toThrow();
  });
});

describe('R-02: Validación de comprobantes', () => {
  it('acepta un encabezado PDF de prueba', () => {
    const content = Buffer.from('%PDF-1.4 demo');

    expect(validateReceipt('comprobante.pdf', content)).toBe(true);
  });

  it('rechaza contenido incompatible con la extensión', () => {
    const content = Buffer.from('contenido de texto');

    expect(validateReceipt('comprobante.pdf', content)).toBe(false);
  });
});

describe('R-06: Autorización de pagos', () => {
  it('permite una operación autorizada', () => {
    expect(authorizePayment(true, true)).toBe(true);
  });

  it('deniega una operación sin autorización', () => {
    expect(authorizePayment(true, false)).toBe(false);
  });

  it('deniega cuando el servicio de permisos falla', () => {
    expect(authorizePayment(false, true)).toBe(false);
  });
});
