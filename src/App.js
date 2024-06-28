import CheckboxSelect from './components/checkbox-select/CheckboxSelect';
import { statesData } from './data/statesData';
import './App.scss';

function App() {
  return (
    <div className="App">
      <CheckboxSelect name={'States Selections'}
                      label={'States'}
                      placeholder={'Search For State'}
                      optionsData={statesData} />
    </div>
  );
}

export default App;
