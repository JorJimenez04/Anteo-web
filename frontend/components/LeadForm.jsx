"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { api } from "@/lib/api";

const MODULOS = [
  "Monitoreo Transaccional en Tiempo Real",
  "Automatización KYC / KYB",
  "Generación de Expedientes SAR/ROS",
  "Integración de APIs a Medida",
];

const INITIAL_FORM = {
  nombre: "",
  empresa: "",
  correo: "",
  cargo: "",
  modulos_interes: [],
  comentarios: "",
};

export function LeadForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [estado, setEstado] = useState("idle");
  const [mensaje, setMensaje] = useState(null);

  function toggleModulo(modulo) {
    setForm((f) => ({
      ...f,
      modulos_interes: f.modulos_interes.includes(modulo)
        ? f.modulos_interes.filter((m) => m !== modulo)
        : [...f.modulos_interes, modulo],
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.nombre || !form.correo || !form.empresa) {
      setEstado("error");
      setMensaje("Por favor complete los campos requeridos (Nombre, Empresa y Correo).");
      return;
    }

    setEstado("cargando");
    try {
      const data = await api.enviarContacto(form);
      setEstado("exito");
      setMensaje(data.mensaje);
      setForm(INITIAL_FORM);
    } catch (err) {
      setEstado("error");
      setMensaje(err.message);
    }
  }

  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle>Solicite una Sesión Técnica de Diagnóstico</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre Completo *</Label>
              <Input
                id="nombre"
                value={form.nombre}
                onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="empresa">Empresa *</Label>
              <Input
                id="empresa"
                value={form.empresa}
                onChange={(e) => setForm((f) => ({ ...f, empresa: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="correo">Correo Corporativo *</Label>
              <Input
                id="correo"
                type="email"
                value={form.correo}
                onChange={(e) => setForm((f) => ({ ...f, correo: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cargo">Cargo (Ej. Compliance Officer / CTO)</Label>
              <Input
                id="cargo"
                value={form.cargo}
                onChange={(e) => setForm((f) => ({ ...f, cargo: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Módulos de Interés</Label>
            <div className="grid gap-2 sm:grid-cols-2">
              {MODULOS.map((modulo) => (
                <div key={modulo} className="flex items-center gap-2">
                  <Checkbox
                    id={modulo}
                    checked={form.modulos_interes.includes(modulo)}
                    onCheckedChange={() => toggleModulo(modulo)}
                  />
                  <Label htmlFor={modulo} className="font-normal">
                    {modulo}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comentarios">Comentarios sobre su infraestructura actual</Label>
            <Textarea
              id="comentarios"
              value={form.comentarios}
              onChange={(e) => setForm((f) => ({ ...f, comentarios: e.target.value }))}
            />
          </div>

          <Button type="submit" className="w-full" disabled={estado === "cargando"}>
            {estado === "cargando" ? "Enviando..." : "📩 Enviar Solicitud de Diagnóstico"}
          </Button>

          {mensaje && (
            <p
              className={`rounded-lg border p-4 text-sm ${
                estado === "exito"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {mensaje}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
