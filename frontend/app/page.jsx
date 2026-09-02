import { HeroSection } from "@/components/HeroSection";
import { MetricsBanner } from "@/components/MetricsBanner";
import { ValueProposition } from "@/components/ValueProposition";
import { TransactionSimulator } from "@/components/TransactionSimulator";
import { KybAuditor } from "@/components/KybAuditor";
import { RoiCalculator } from "@/components/RoiCalculator";
import { LeadForm } from "@/components/LeadForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <HeroSection />
      <MetricsBanner />

      <Tabs defaultValue="propuesta" className="mt-4">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="propuesta">🌐 Propuesta de Valor</TabsTrigger>
          <TabsTrigger value="scoring">⚡ Demo: Motor Transaccional</TabsTrigger>
          <TabsTrigger value="kyb">👤 Demo: Verificación KYB / UBO</TabsTrigger>
          <TabsTrigger value="roi">📊 Calculadora de Eficiencia</TabsTrigger>
          <TabsTrigger value="contacto">📅 Agendar Diagnóstico</TabsTrigger>
        </TabsList>

        <TabsContent value="propuesta">
          <ValueProposition />
        </TabsContent>
        <TabsContent value="scoring">
          <TransactionSimulator />
        </TabsContent>
        <TabsContent value="kyb">
          <KybAuditor />
        </TabsContent>
        <TabsContent value="roi">
          <RoiCalculator />
        </TabsContent>
        <TabsContent value="contacto">
          <LeadForm />
        </TabsContent>
      </Tabs>
    </main>
  );
}
