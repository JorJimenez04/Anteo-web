const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function postJSON(path, body) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    const message = errorBody?.detail
      ? Array.isArray(errorBody.detail)
        ? errorBody.detail.map((e) => e.msg).join(", ")
        : errorBody.detail
      : `Error ${res.status} al conectar con la API de Anteo.`;
    throw new Error(message);
  }

  return res.json();
}

export const api = {
  evaluarTransaccion: (payload) => postJSON("/api/v1/scoring/evaluar-transaccion", payload),
  validarEmpresa: (payload) => postJSON("/api/v1/kyb/validar-empresa", payload),
  calcularRoi: (payload) => postJSON("/api/v1/roi/calcular", payload),
  enviarContacto: (payload) => postJSON("/api/v1/contacto", payload),
};
