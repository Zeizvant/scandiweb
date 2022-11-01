import './App.css';
import { PureComponent } from 'react';
import Menu from './components/Menu/index';

class App extends PureComponent {
  render(){
    return (
      <div>
        <Menu />
      </div>
    )
  }
}

export default App;
