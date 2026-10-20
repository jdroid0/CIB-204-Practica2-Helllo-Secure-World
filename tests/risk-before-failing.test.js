import { describe, expect, it } from 'vitest';

import {
  createInsecurePaymentProcessor,
  insecureValidateReceipt,
  insecureAuthorizePayment,
} from '../src/risk-controls-insecure-demo.js';

describe('ANTES - Controles de seguridad ausentes', () => {
  it('R-01: no debe procesar pagos duplicados', () => {
    const processPayment = createInsecurePaymentProcessor();

    processPayment('pago-001', 100);
    const retry = processPayment('pago-001', 100);

    expect(retry.processingCount).toBe(1);
  });

  it('R-02: debe rechazar comprobantes inválidos', () => {
    expect(insecureValidateReceipt('comprobante.pdf')).toBe(false);
  });

  it('R-06: debe denegar cuando falla autorización', () => {
    expect(insecureAuthorizePayment(false, true)).toBe(false);
  });
});
