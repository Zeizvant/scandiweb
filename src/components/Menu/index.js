import { PureComponent } from 'react';
import './menu.css';
import logo from '../../images/logo.png';
import CurrencySwitcher from '../CurrencySwitcher';
import Cart from '../Cart';

class Menu extends PureComponent {
    render(){
        return (
            <div>
                <div>
                    <ul>
                        <li>women</li>
                        <li>men</li>
                        <li>kids</li>
                    </ul>
                </div>
                <div>
                    <img src={logo} alt='Logo'/>
                </div>
                <div>
                    <CurrencySwitcher />
                </div>
                <div>
                    <Cart />
                </div>
            </div>
            
        )
    }
}

export default Menu;