
import './App.css'
import Header from './components/header/Header';
import SearchForm from './components/searchform/SearchForm';
import Buttons from './components/buttons/Buttons';
import Create from './components/create/Create';
import CardList from './components/cardlist/CardList';

function App() {

  return (
    <div>
      <Header />
      <SearchForm />
      <div className='buttons-container'>
        <Buttons />
        <Create />
      </div>

      <CardList />
    </div>
  )
}

export default App
