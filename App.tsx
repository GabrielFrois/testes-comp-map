// App.tsx

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Abas from './components/Abas';
import FiltroMapa from './components/FiltroMapa';
import FiltroGrafico from './components/FiltroGrafico';
import Mapa from './components/Mapa';
import MapaVazio from './components/MapaVazio';
import Grafico from './components/Grafico';
import styled from 'styled-components';

const App: React.FC = () => {
  const [ativo, setAtivo] = useState('mapa');
  const location = useLocation();

  const handleClick = (tipo: string) => {
    setAtivo(tipo);
  };

  const [filtros, setFiltros] = useState({
    tipo: 'Focos',
    estado: '',
    bioma: '',
    inicio: '',
    fim: ''
  });

  return (
    <AppContainer>
      <Header />
      <MainContent>
        <ContentContainer>
          <Abas onClick={handleClick} ativo={ativo} />

          {/* Filtro condicional */}
          {ativo === 'mapa' ? (
            <FiltroMapa onFiltrar={setFiltros} />
          ) : (
            <FiltroGrafico onFiltrar={setFiltros} />
          )}

          {/* Conteúdo principal */}
          {ativo === 'mapa' ? (
            <>
              {location.pathname === '/risco' ? (
                <Mapa tipo="risco" filtros={filtros} />
              ) : location.pathname === '/foco_calor' ? (
                <Mapa tipo="foco_calor" filtros={filtros} />
              ) : location.pathname === '/area_queimada' ? (
                <Mapa tipo="area_queimada" filtros={filtros} />
              ) : location.pathname === '/cerrado' ? (
                <Mapa tipo="cerrado" filtros={filtros} />
              ) : (
                <MapaVazio />
              )}

            </>
          ) : (
            <Grafico />
          )}
        </ContentContainer>
      </MainContent>
    </AppContainer>
  );
};

export default App;

// Estilos com styled-components
const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`;

const MainContent = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
