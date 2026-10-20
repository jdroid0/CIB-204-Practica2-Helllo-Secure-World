
import { describe, it, expect } from "vitest";

import {
  createPaymentProcessor,
  validateReceipt,
  authorizePayment,
} from "../src/risk-controls-demo.js";

describe("P-01 - Camino válido", () => {
  it("autoriza la operación, acepta el PDF y procesa el pago una sola vez", () => {
    // 1. Datos de una operación válida
    const idempotencyKey = "PAGO-001";
    const amount = 100;

    // PDF de prueba con firma básica válida
    const filename = "comprobante.pdf";
    const content = Buffer.from("%PDF-1.4\nDocumento de prueba");

    // 2. Verificar autorización
    const authorized = authorizePayment(true, true);
    expect(authorized).toBe(true);
    console.log("1. Autorización:", authorized);

    // 3. Verificar comprobante
    const receiptValid = validateReceipt(filename, content);
    expect(receiptValid).toBe(true);

    // 4. Procesar el pago autorizado
    const processPayment = createPaymentProcessor();

    const payment = processPayment(idempotencyKey, amount);

    expect(payment.status).toBe("processed");
    expect(payment.amount).toBe(100);
    expect(payment.repeated).toBe(false);
    console.log("3. Pago procesado:", payment);

    // 5. Comprobar que un reintento no genera otro procesamiento
    const retry = processPayment(idempotencyKey, amount);

    expect(retry.status).toBe("processed");
    expect(retry.repeated).toBe(true);
    expect(retry.idempotencyKey).toBe(payment.idempotencyKey);
    console.log("4. Reintento:", retry);
  });
});
