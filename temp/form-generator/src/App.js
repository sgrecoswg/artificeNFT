import logo from './logo.svg';
import FormSection from './components/FormSection';
import './App.css';

function App() {

  let fsection = {
    "key":"skey",
    "title":"you did it",
    "groups":[
      {"key":"g1","title":"1"}

    ]
  };

  return (
    <FormSection section={fsection}></FormSection>
  );
}

export default App;
