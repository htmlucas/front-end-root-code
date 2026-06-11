import { useState } from 'react';
import { useQuoteStore } from '../store/quoteStore';

type Addon = 'bagagem' | 'esportes_aventura';

interface Traveler {
  nome: string;
  data_nascimento: string;
  adicionais: Addon[];
}

export default function TripForm() {
  const fetchQuote = useQuoteStore((s) => s.fetchQuote);
  const loading = useQuoteStore((s) => s.loading);
  const errors = useQuoteStore((s) => s.errors);

  const [destino, setDestino] =
    useState<'nacional' | 'americas' | 'europa'>('europa');

  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const [viajantes, setViajantes] = useState<Traveler[]>([
    {
      nome: '',
      data_nascimento: '',
      adicionais: [],
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetchQuote({
      destino,
      data_inicio: dataInicio,
      data_fim: dataFim,
      viajantes,
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">

        {/* HEADER */}
        <div className="card">
          <h1>🧳 Cotação Seguro Viagem</h1>
          <p>Preencha os dados para calcular sua cotação</p>
        </div>

        {/* DADOS DA VIAGEM */}
        <div className="card">
          <h2>Dados da Viagem</h2>

          <div className="grid-2">

            <label>
              Destino
              <select
                value={destino}
                onChange={(e) =>
                  setDestino(e.target.value as any)
                }
              >
                <option value="nacional">Nacional</option>
                <option value="americas">Américas</option>
                <option value="europa">Europa</option>
              </select>
            </label>

            <label>
              Data início
              <input
                type="date"
                value={dataInicio}
                onChange={(e) =>
                  setDataInicio(e.target.value)
                }
              />
              {errors.data_inicio && (
                <span className="error">
                  {errors.data_inicio[0]}
                </span>
              )}
            </label>

            <label>
              Data fim
              <input
                type="date"
                value={dataFim}
                onChange={(e) =>
                  setDataFim(e.target.value)
                }
              />
              {errors.data_fim && (
                <span className="error">
                  {errors.data_fim[0]}
                </span>
              )}
            </label>

          </div>
        </div>

        {/* VIAJANTES */}
        <div className="card">
          <h2>Viajantes</h2>

          {viajantes.map((v, i) => (
            <div key={i} className="card">

              <div className="grid-2">

                <label>
                  Nome
                  <input
                    value={v.nome}
                    onChange={(e) => {
                      const copy = [...viajantes];
                      copy[i].nome = e.target.value;
                      setViajantes(copy);
                    }}
                  />
                  {errors[`viajantes.${i}.nome`]?.[0] && (
                    <span className="error">
                      {errors[`viajantes.${i}.nome`][0]}
                    </span>
                  )}
                </label>

                <label>
                  Data nascimento
                  <input
                    type="date"
                    value={v.data_nascimento}
                    onChange={(e) => {
                      const copy = [...viajantes];
                      copy[i].data_nascimento = e.target.value;
                      setViajantes(copy);
                    }}
                  />
                  {errors[`viajantes.${i}.data_nascimento`]?.[0] && (
                    <span className="error">
                      {errors[`viajantes.${i}.data_nascimento`][0]}
                    </span>
                  )}
                </label>

              </div>

              {/* ADDONS */}
              <div className="checkbox-group">

                <label>
                  <input
                    type="checkbox"
                    checked={v.adicionais.includes('bagagem')}
                    onChange={() => {
                      const copy = [...viajantes];
                      const exists = copy[i].adicionais.includes('bagagem');

                      copy[i].adicionais = exists
                        ? copy[i].adicionais.filter((a) => a !== 'bagagem')
                        : [...copy[i].adicionais, 'bagagem'];

                      setViajantes(copy);
                    }}
                  />
                  Bagagem
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={v.adicionais.includes('esportes_aventura')}
                    onChange={() => {
                      const copy = [...viajantes];
                      const exists = copy[i].adicionais.includes('esportes_aventura');

                      copy[i].adicionais = exists
                        ? copy[i].adicionais.filter((a) => a !== 'esportes_aventura')
                        : [...copy[i].adicionais, 'esportes_aventura'];

                      setViajantes(copy);
                    }}
                  />
                  Esportes aventura
                </label>

              </div>

              {/* REMOVER */}
              {viajantes.length > 1 && (
                <div className="actions">
                  <button
                    type="button"
                    onClick={() =>
                      setViajantes(
                        viajantes.filter((_, idx) => idx !== i)
                      )
                    }
                  >
                    Remover viajante
                  </button>
                </div>
              )}

            </div>
          ))}

          <div className="actions">
            <button
              type="button"
              onClick={() =>
                setViajantes([
                  ...viajantes,
                  {
                    nome: '',
                    data_nascimento: '',
                    adicionais: [],
                  },
                ])
              }
            >
              + Adicionar viajante
            </button>
          </div>
        </div>

        {/* SUBMIT */}
        <div className="card">
          <button type="submit" disabled={loading}>
            {loading ? 'Calculando...' : 'Calcular Cotação'}
          </button>
        </div>

      </form>
    </div>
  );
}