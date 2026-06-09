import { useState } from 'react';
import { api } from '../services/api';
import { useQuoteStore } from '../store/quoteStore';

interface Traveler {
  nome: string;
  data_nascimento: string;
  adicionais: string[];
}

export default function TripForm() {
  const setQuote = useQuoteStore(
    (state) => state.setQuote
  );

  const setLoading = useQuoteStore(
    (state) => state.setLoading
  );

  const [destino, setDestino] =
    useState('EUROPA');

  const [dataInicio, setDataInicio] =
    useState('');

  const [dataFim, setDataFim] =
    useState('');

  const [viajantes, setViajantes] =
    useState<Traveler[]>([
      {
        nome: '',
        data_nascimento: '',
        adicionais: [],
      },
    ]);

  const addTraveler = () => {
    setViajantes([
      ...viajantes,
      {
        nome: '',
        data_nascimento: '',
        adicionais: [],
      },
    ]);
  };

  const removeTraveler = (index: number) => {
    setViajantes(
      viajantes.filter((_, i) => i !== index)
    );
  };

  const updateTraveler = (
    index: number,
    field: keyof Traveler,
    value: any
  ) => {
    const updated = [...viajantes];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setViajantes(updated);
  };

  const toggleAddon = (
    index: number,
    addon: string
  ) => {
    const traveler = viajantes[index];

    const exists =
      traveler.adicionais.includes(addon);

    const adicionais = exists
      ? traveler.adicionais.filter(
          (item) => item !== addon
        )
      : [...traveler.adicionais, addon];

    updateTraveler(
      index,
      'adicionais',
      adicionais
    );
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        destino,
        data_inicio: dataInicio,
        data_fim: dataFim,
        viajantes,
      };

      const { data } = await api.post(
        '/quotes',
        payload
      );

      setQuote(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nova Cotação</h2>

      <div>
        <label>Destino</label>

        <select
          value={destino}
          onChange={(e) =>
            setDestino(e.target.value)
          }
        >
          <option value="NACIONAL">
            Nacional
          </option>

          <option value="AMERICAS">
            Américas
          </option>

          <option value="EUROPA">
            Europa
          </option>
        </select>
      </div>

      <div>
        <label>Data início</label>

        <input
          type="date"
          value={dataInicio}
          onChange={(e) =>
            setDataInicio(e.target.value)
          }
        />
      </div>

      <div>
        <label>Data fim</label>

        <input
          type="date"
          value={dataFim}
          onChange={(e) =>
            setDataFim(e.target.value)
          }
        />
      </div>

      <hr />

      <h3>Viajantes</h3>

      {viajantes.map((viajante, index) => (
        <div
          key={index}
          style={{
            border: '1px solid #ccc',
            padding: 10,
            marginBottom: 10,
          }}
        >
          <input
            placeholder="Nome"
            value={viajante.nome}
            onChange={(e) =>
              updateTraveler(
                index,
                'nome',
                e.target.value
              )
            }
          />

          <br />

          <input
            type="date"
            value={
              viajante.data_nascimento
            }
            onChange={(e) =>
              updateTraveler(
                index,
                'data_nascimento',
                e.target.value
              )
            }
          />

          <div>
            <label>
              <input
                type="checkbox"
                checked={viajante.adicionais.includes(
                  'BAGAGEM'
                )}
                onChange={() =>
                  toggleAddon(
                    index,
                    'BAGAGEM'
                  )
                }
              />

              Bagagem
            </label>

            <label>
              <input
                type="checkbox"
                checked={viajante.adicionais.includes(
                  'ESPORTES_AVENTURA'
                )}
                onChange={() =>
                  toggleAddon(
                    index,
                    'ESPORTES_AVENTURA'
                  )
                }
              />

              Esportes de aventura
            </label>
          </div>

          {viajantes.length > 1 && (
            <button
              type="button"
              onClick={() =>
                removeTraveler(index)
              }
            >
              Remover
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addTraveler}
      >
        Adicionar viajante
      </button>

      <br />
      <br />

      <button type="submit">
        Calcular cotação
      </button>
    </form>
  );
}