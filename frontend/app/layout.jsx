import "./globals.css";

export const metadata = {
  title: "Anteo | Enterprise Compliance & RegTech Solutions",
  description:
    "Arquitectura tecnológica para Monitoreo Transaccional, Onboarding Digital (KYC/KYB) y Prevención de Riesgo SARLAFT/SAGRILAFT.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-slate-50 font-sans text-slate-900 antialiased">{children}</body>
    </html>
  );
}
