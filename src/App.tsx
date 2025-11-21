import { useGradeStore } from "@/store/useGradeStore";
import { Bimester } from "@/components/Bimester";
import { Summary } from "@/components/Summary";
import { Exam } from "@/components/Exam";

function App() {
  const { bimesters } = useGradeStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Calculadora de Notas
          </h1>
          <p className="text-muted-foreground">
            Gerencie suas atividades e acompanhe sua aprovação.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bimesters.map((bimester) => (
            <Bimester key={bimester.id} bimester={bimester} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Summary />
          <div className="flex flex-col justify-center">
            <Exam />
          </div>
        </div>

        <footer className="text-center text-xs text-muted-foreground pt-8">
          <p>Desenvolvido com React, Vite, Tailwind e Shadcn.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
