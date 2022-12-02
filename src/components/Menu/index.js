import { PureComponent } from 'react';
import './menu.css';
import logo from '../../images/logo.png';
import CurrencySwitcher from '../CurrencySwitcher';
import CartDropDown from '../CartDropDown'
import {Link} from 'react-router-dom'
import { throwServerError } from '@apollo/client';

class Menu extends PureComponent {
    render(){
        return (
            <div className='menu-main'>
                <div className='menu'>
                    <div className='menu-categories'>
                        <ul>
                            <Link to='/'>
                                <li onClick={(event) => {
                                    this.props.changeCategories(event.target.innerHTML)
                                }}>all</li>
                            </Link>
                            <Link to='/'>
                                <li onClick={(event) => {
                                    this.props.changeCategories(event.target.innerHTML)
                                }}>clothes</li>
                            </Link>
                            
                            <Link to='/'>
                                <li onClick={(event) => {
                                    this.props.changeCategories(event.target.innerHTML)
                                }}>tech</li>
                            </Link>
                            
                        </ul>
                    </div>
                    <div className='main-logo'>
                        <Link to='/'>
                            <img src={logo} alt='Logo'/>    
                        </Link>
                        
                    </div>
                    <div className='currency-cart'>
                        <CurrencySwitcher changeCurrency={this.props.changeCurrency} currency={this.props.currency}/>
                        <CartDropDown 
                            data={this.props.data} 
                            currency={this.props.currency} 
                            cartItems={this.props.cartItems}
                            addToCart={this.props.addToCart}
                            removeFromCart={this.props.removeFromCart}
                            totalPrice={this.props.totalPrice}
                        />
                    </div>
                </div>
            </div>
            
            
        )
    }
}

export default Menu;