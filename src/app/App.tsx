import { QueryProvider } from "@/app/providers/QueryProvider";
import { ThemeProvider } from "@/app/providers/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '0.5rem' }}>
          <h1>Vernel.dev</h1>
          <p>Portafolio en construcción</p>
        </main>
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;
