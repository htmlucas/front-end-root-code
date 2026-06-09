import TripForm from './components/TripForm.tsx';
import QuoteResult from './components/QuoteResult.tsx';

function App() {
  return (
    <div
      style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: 20,
      }}
    >
      <h1>Seguro Viagem</h1>

      <TripForm />

      <QuoteResult />
    </div>
  );
}

export default App;