// sendRoute.test.js
import { describe, it, expect } from "vitest";
import axios from "axios";

// Teste da rota /send
describe("Teste da rota /send", () => {

  const filaTeste = "teste";

  it("Deve enviar dados e receber uma objeto como resposta", async () => {
    const payload = {
      mensagem: `mensagem teste`,
      fila: filaTeste,
      log: true,
    };

    const response = await axios.post("http://localhost:3000/send", payload);

    expect(response.status).toBe(200);

    expect(response.data).toEqual(
      expect.objectContaining({
        success: `Mensagem enviada para a fila teste`,
        mensagem: `mensagem ${filaTeste}`,
      })
    );
  });
});
