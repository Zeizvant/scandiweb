import { PureComponent } from 'react';
import './cartDropDown.css';
import cartLogo from '../../images/emptyCart.png'
import {Link} from 'react-router-dom'

class CartDropDown extends PureComponent {

    constructor(props){
        super(props)
        this.state = {clicked: false}
        this.plusButton = this.plusButton.bind(this)
        this.minusButton = this.minusButton.bind(this)
    }

    componentDidMount(){
        document.addEventListener('click', (event) => {
            if(document.querySelector('.cart-dropdown-menu') != undefined){
                if(!document.querySelector('.cart-dropdown-menu').contains(event.target) && this.state.clicked && 
            event.target.id !== 'cart-dropdown-logo' && event.target.id !== 'minus-button'
            ){
                this.setState({clicked: false})
                document.querySelector('.overlay').style.display = "none"
                document.body.style.overflow = 'auto'
            }
            }
            
        })
    }
    

    componentWillUnmount(){
        document.removeEventListener('click')
    }

    plusButton(item, price, attributes){
        let id = item.id
        this.props.addToCart({
            id: item.id,
            name: item.name,
            price: price,
            attributes: attributes.map(item => {
                id += item.value
                return {name: item.name, value: item.value}
            }),
            longId: id
        })
        
    }
    minusButton(item, price, attributes){
        let id = item.id
        this.props.removeFromCart({
            id: item.id,
            name: item.name,
            price: price,
            attributes: attributes.map(item => {
                id += item.value
                return {name: item.name, value: item.value}
            }),
            longId: id
        })
        this.setState({clicked: true})
    }

    render(){
        if(this.props.data[0] != undefined){
                        return (
                            
                            <div className="cart-dropdown">
                                {
                                    this.props.quantity > 0 && 
                                    <div className='quantity-circle'>
                                        {this.props.quantity}
                                    </div>
                                }
                                <img id="cart-dropdown-logo" className='cart-dropdown-logo' src={cartLogo} onClick={() => {
                                    const body = document.querySelector('.main')
                                    if(!this.state.clicked){
                                        document.querySelector('.overlay').style.display = "block"
                                        document.body.style.overflow = 'hidden'
                                    }else{
                                        document.querySelector('.overlay').style.display = "none"
                                        document.body.style.overflow = 'auto'
                                    }
                                    this.setState({clicked: !this.state.clicked})   
                                }}/>
                                
                                <div className={this.state.clicked ? 'cart-dropdown-menu' : 'cart-dropdown-menu none'}>
                                    <h2>My bag, <span className='h2-span'>
                                        {this.props.cartItems.length > 1 ? this.props.cartItems.length + ' items': this.props.cartItems.length + ' item'}
                                        </span></h2>
                                    {this.props.cartItems.map(cartItem => {
                                        return (
                                            this.props.data.map((item) => {
                                                const price = item.prices.filter(price => price.currency.symbol == this.props.currency)
                                                if(cartItem.id === item.id){
                                                    return ( 
                                                        <div key={cartItem.id} className='cart-dropdown-item'>
                                                            <div className='cart-dropdown-description'>
                                                                <p className='cart-dropdown-item-header'>{item.brand}</p>
                                                                <p className='cart-dropdown-item-name'>{item.name}</p>
                                                                <p className='cart-dropdown-price'>{price[0].currency.symbol + price[0].amount.toFixed(2)}</p>
                                                                <div className='cart-dropdown-attrs'>
                                                                    {item.attributes.map(attr => {
                                                                        if(attr.type == 'swatch'){
                                                                            return (
                                                                                <div className='cart-dropdown-attribute' key={attr.id}>
                                                                                    <p className='cart-dropdown-attr-name'>{attr.name}:</p>
                                                                                    <div className='cart-dropdown-attr-items'>
                                                                                        {attr.items.map(item => {
                                                                                            const attrObj = cartItem.attributes.find(attrName => {
                                                                                                if(attrName.name == attr.name){
                                                                                                    return {attrName}
                                                                                                }
                                                                                                
                                                                                            });
                                                                                            return (
                                                                                                <div key={item.id} className={attr.name == attrObj.name && item.value == attrObj.value ? 'cart-dropdown-color-selected' : 'cart-dropdown-color-noselected'}>
                                                                                                    <div  className="cart-dropdown-color" style={{'background': item.value}}></div>
                                                                                                </div>
                                                                                            )
                                                                                        })}
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        }else{
                                                                            return (
                                                                                <div className='cart-dropdown-attribute' key={attr.id}>
                                                                                    <p className='cart-dropdown-attr-name'>{attr.name}:</p>
                                                                                    <div className='cart-dropdown-attr-items'>
                                                                                        {attr.items.map(item => {
                                                                                            const attrObj = cartItem.attributes.find(attrName => {
                                                                                                if(attrName.name == attr.name){
                                                                                                    return {attrName}
                                                                                                }
                                                                                                
                                                                                            });
                                                                                            return (                                                                
                                                                                                <div 
                                                                                                className={attr.name == attrObj.name && item.displayValue == attrObj.value ?'cart-dropdown-value value-selected' 
                                                                                                :
                                                                                                'cart-dropdown-value'}
                                                                                                key={item.id}>{item.displayValue}</div>
                                                                                            )
                                                                                        })}
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    })}
                                                                </div>
                                                            </div>
                                                            <div className='cart-dropdown-middle'>
                                                                <div className='cart-dropdown-middle-buttons' onClick={() => {
                                                                    this.plusButton(item, item.prices, cartItem.attributes)
                                                                }}>+</div>
                                                                <div className='cart-dropdown-middle-quantity'>{cartItem.quantity}</div>
                                                                <div id='minus-button' className='cart-dropdown-middle-buttons' onClick={() => {
                                                                    this.minusButton(item, item.prices, cartItem.attributes)
                                                                }}>-</div>
                                                            </div>
                                                            <div>
                                                                <img className='cart-dropdown-img' src={item.gallery[0]} />
                                                            </div>
                                                            
                                                        </div>
                                            )
                                                }
                                            })
                                        )
                                        
                                    })}
                                    {this.props.cartItems.length > 0 && 
                                        <div className='total-container'>
                                            <div className='total'>
                                                <p className='total-text'>Total</p>
                                                <p className='total-price'>{this.props.currency + this.props.totalPrice.toFixed(2)}</p>
                                            </div>   
                                            <div className='dropdown-buttons'>
                                                <Link to='/cart'>
                                                    <div className='dropdown-buttons-bag' onClick={() => {
                                                        this.setState({clicked: false})
                                                        document.querySelector('.overlay').style.display = "none"
                                                        document.body.style.overflow = 'auto'
                                                    }}>view bag</div>
                                                </Link>
                                                <div className='dropdown-buttons-check'>check out</div>
                                            </div>
                                        </div>
                                    }
                                    
                                </div>
                            </div>
                        )
                    }else{
                        return 
                    }
            
            
        }
    }

export default CartDropDown;