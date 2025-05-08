// Mapa.tsx

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MapComponent from './MapComponent';

// Tipagem da ocorrência (dados do mapa)
interface Ocorrencia {
  latitude: number;
  longitude: number;
  estado: string;
  bioma: string;
  risco_fogo: number;
  data: string;
  dia_sem_chuva?: string;
  precipitacao?: number | undefined;
  frp?: string;
}

// Tipagem dos filtros usados na busca
interface Filtros {
  tipo: string;
  estado: string;
  bioma: string;
  inicio: string;
  fim: string;
}

// Props recebidas pelo componente Mapa
interface MapaProps {
  tipo: string;
  filtros: Filtros;
}

const Mapa: React.FC<MapaProps> = ({ tipo, filtros }) => {
  const [dados, setDados] = useState<Ocorrencia[]>([]);

  const montarQueryParams = () => {
    const params = new URLSearchParams();
    if (filtros.tipo) params.append('tipo', filtros.tipo);
    if (filtros.estado) params.append('estado', filtros.estado);
    if (filtros.bioma) params.append('bioma', filtros.bioma);
    if (filtros.inicio) params.append('inicio', filtros.inicio);
    if (filtros.fim) params.append('fim', filtros.fim);
    return params.toString();
  };

  useEffect(() => {
    const fetchData = async () => {
      const query = montarQueryParams();
      const url =
        tipo === 'risco'
          ? `/api/risco${query ? `?${query}` : ''}`
          : tipo === 'foco_calor'
            ? `/api/foco_calor${query ? `?${query}` : ''}`
            : tipo === 'area_queimada'
              ? `/api/area_queimada${query ? `?${query}` : ''}`
              : tipo === 'cerrado'  // Adiciona a condição para 'cerrado'
                ? `/api/cerrado${query ? `?${query}` : ''}`
                : '';
                

      console.log('URL gerada:', url);

      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log('Dados recebidos:', data);
        setDados(data);
      } catch (error) {
        console.error('Erro ao buscar dados filtrados:', error);
      }
    };

    fetchData();
  }, [filtros, tipo]);

  return (
    <MapaContainer>
      <MapComponent dados={dados} />
    </MapaContainer>
  );
};

export default Mapa;

const MapaContainer = styled.div`
  width: 153vh;
  height: 90vh;
  border-radius: 8px;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #e0e0e0; // ou deixe transparente, se quiser sem fundo
  border-top-right-radius: 8px;
  z-index: 1;
  margin-top: 0.5%;
  margin-left: 22%; // desloca o mapa para a direita, liberando espaço para o filtro
  position: fixed;
`;

