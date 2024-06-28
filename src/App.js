import CheckboxSelect from './components/checkbox-select/CheckboxSelect';
import { statesData } from './data/statesData';
import './App.scss';

function App() {
  return (
    <div className="App">
      <CheckboxSelect name={'States Selections'}
                      placeholder={'Search For States'}
                      optionsData={statesData} />
    </div>
  );
}

export default App;
