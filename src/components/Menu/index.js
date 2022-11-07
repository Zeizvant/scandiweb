import { PureComponent } from 'react';
import './menu.css';
import logo from '../../images/logo.png';
import CurrencySwitcher from '../CurrencySwitcher';
import Cart from '../Cart';

class Menu extends PureComponent {
    render(){
        return (
            <div className='menu'>
                <div className='menu-categories'>
                    <ul>
                        <li>all</li>
                        <li>clothes</li>
                        <li>tech</li>
                    </ul>
                </div>
                <div className='main-logo'>
                    <img src={logo} alt='Logo'/>
                </div>
                <div className='currency-cart'>
                    <CurrencySwitcher changeCurrency={this.props.changeCurrency} currency={this.props.currency}/>
                    <Cart />
                </div>
            </div>
            
        )
    }
}

export default Menu;