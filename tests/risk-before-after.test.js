import { Buffer } from 'node:buffer';
import { describe, expect, it } from 'vitest';

import {
  createInsecurePaymentProcessor,
  insecureValidateReceipt,
  insecureAuthorizePayment,
} from '../src/risk-controls-insecure-demo.js';

import {
  createPaymentProcessor,
  validateReceipt,
  authorizePayment,
} from '../src/risk-controls-demo.js';

describe('R-01: Duplicación de pagos', () => {
  it('ANTES: sin idempotencia, procesa dos veces', () => {
    const process = createInsecurePaymentProcessor();

    process('pago-001', 100);
    const retry = process('pago-001', 100);

    expect(retry.processingCount).toBe(2);
  });

  it('DESPUÉS: identifica el reintento', () => {
    const process = createPaymentProcessor();

    process('pago-001', 100);
    const retry = process('pago-001', 100);

    expect(retry.repeated).toBe(true);
  });
});

describe('R-02: Comprobante malicioso', () => {
  const fakePdf = Buffer.from('archivo de texto de prueba');

  it('ANTES: acepta un archivo solo por su extensión', () => {
    expect(insecureValidateReceipt('comprobante.pdf')).toBe(true);
  });

  it('DESPUÉS: rechaza contenido incompatible', () => {
    expect(validateReceipt('comprobante.pdf', fakePdf)).toBe(false);
  });
});

describe('R-06: Fallo de autorización', () => {
  it('ANTES: permite una operación cuando falla permisos', () => {
    expect(insecureAuthorizePayment(false, true)).toBe(true);
  });

  it('DESPUÉS: deniega cuando falla permisos', () => {
    expect(authorizePayment(false, true)).toBe(false);
  });
});
