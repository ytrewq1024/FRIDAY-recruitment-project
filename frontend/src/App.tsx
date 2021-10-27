import './styles/App.scss';
import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import SelectCarContainer from './SelectVehicle/SelectVehicleContainer';

const queryClient: QueryClient = new QueryClient();

const App: FC = () => {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <SelectCarContainer />
      </QueryClientProvider>
    </div>
  );
}

export default App;
