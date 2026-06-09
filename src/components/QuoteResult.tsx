import { useQuoteStore } from '../store/quoteStore';

export default function QuoteResult() {
  const quote = useQuoteStore((state) => state.quote);
  const loading = useQuoteStore((state) => state.loading);

  if (loading) return <p>Calculando...</p>;
  if (!quote) return null;

  return (
    <div
      style={{
        marginTop: 30,
        border: '1px solid #ddd',
        padding: 20,
      }}
    >
      <h2>Resultado da Cotação</h2>

      <p>
        Dias cobrados:
        <strong>
          {' '}
          {quote.dias_cobrados}
        </strong>
      </p>

      <hr />

      <h3>Viajantes</h3>

      {quote.viajantes.map(
        (traveler, index) => (
          <div
            key={index}
            style={{
              marginBottom: 15,
            }}
          >
            <strong>
              {traveler.nome}
            </strong>

            <p>
              Idade: {traveler.idade}
            </p>

            <p>
              Subtotal: R${' '}
              {Number(
                traveler.subtotal
              ).toFixed(2)}
            </p>

            <p>
              Adicionais:
              {traveler.adicionais_aplicados.join(
                ', '
              )}
            </p>
          </div>
        )
      )}

      <hr />

      {quote.avisos.length > 0 && (
        <>
          <h3>Avisos</h3>

          <ul>
            {quote.avisos.map(
              (aviso, index) => (
                <li key={index}>
                  {aviso}
                </li>
              )
            )}
          </ul>

          <hr />
        </>
      )}

      <p>
        Desconto do grupo:
        <strong>
          {' '}
          {
            quote.desconto_grupo_percentual
          }
          %
        </strong>
      </p>

      <h2>
        Total Final: R${' '}
        {Number(
          quote.total_final
        ).toFixed(2)}
      </h2>
    </div>
  );
}