import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="space-y-3 py-2">
      <h1 className="text-2xl font-semibold text-text-primary">Главная</h1>
      <p className="text-sm text-text-secondary">Прототип travel super app готов к наполнению.</p>
      <Button className="bg-brand-blue text-white hover:bg-brand-blue/90">Тест shadcn Button</Button>
    </section>
  );
}
