import { PureComponent } from 'react';
import './menu.css';
import logo from '../../images/logo.png';
import CurrencySwitcher from '../CurrencySwitcher';
import CartDropDown from '../CartDropDown'
import {Link} from 'react-router-dom'
import Context from '../../Context';

class Menu extends PureComponent {

    static contextType = Context

    render(){
        return (
            <div className='menu-main'>
                <div className='menu'>
                    <div className='menu-categories'>
                        <ul>
                            {
                                this.context.categories.map(category => {
                                    return (
                                        <Link to={`/${category.name}`} key={category.name}>
                                            <li >{category.name}</li>
                                        </Link>
                                    )
                                })
                            }
                            
                        </ul>
                    </div>
                    <div className='main-logo'>
                        <Link to='/'>
                            <img src={logo} alt='Logo'/>    
                        </Link>
                        
                    </div>
                    <div className='currency-cart'>
                        <CurrencySwitcher />
                        <CartDropDown />
                    </div>
                </div>
            </div>
            
            
        )
    }
}

export default Menu;