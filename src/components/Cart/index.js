import { PureComponent } from 'react';
import './cart.css';

class Cart extends PureComponent {

    constructor(props){
        super(props)
        this.state = {counter: 0, changed: false}
        this.plusButton = this.plusButton.bind(this)
        this.minusButton = this.minusButton.bind(this)
    }

    plusButton(item, price, cartItem){
        let id = item.id
        this.props.addToCart({
            id: item.id,
            name: item.name,
            price: price,
            attributes: cartItem.attributes.map(item => {
                id += item.value
                return {name: item.name, value: item.value}
            }),
            longId : id
        })
        
    }
    minusButton(item, price, cartItem){
        let id = item.id
        this.props.removeFromCart({
            id: item.id,
            name: item.name,
            price: price,
            attributes: cartItem.attributes.map(item => {
                id += item.value
                return {name: item.name, value: item.value}
            }),
            longId : id
        })
        
    }
    

    static getDerivedStateFromProps(props, state){
        if(props.data[0] != undefined && state.changed == false){
            let cartItemsObj = {}
            for(let i = 0; i<props.cartItems.length; i++){
                const longId = props.cartItems[i].longId
                const id = props.cartItems[i].id
                for(let j = 0; j<props.data.length; j++){
                    if(id == props.data[j].id){
                        cartItemsObj[longId] = {...props.cartItems[i], images: props.data[j].gallery, counter: 0}
                    }
                }
                
            }
            return {cartItems: cartItemsObj, counter: 0, changed: true}
        }else{
            return null
        }
        
    }

    

    render(){
        
        if(this.props.data[0] != undefined && this.state.cartItems != undefined){
            let quantity = 0;
            for(let i=0; i<this.props.cartItems.length; i++){
                quantity+= this.props.cartItems[i].quantity
            }
            return (
                <div className='cart-component'>
                    <div>
                        <h1>CART</h1>
                        {this.props.cartItems.map(cartItem => {
                            return (
                                this.props.data.map((item) => {
                                    const id = cartItem.longId
                                    const images = item.gallery
                                    const price = item.prices.filter(price => price.currency.symbol == this.props.currency)
                                    if(cartItem.id === item.id && cartItem.quantity > 0){
                                        return (
                                            <div className='cart-component-item-continer'>
                                        <div className='cart-component-item'>
                                            <h2>{item.brand}</h2>
                                            <p>{item.name}</p>
                                            <p className='cart-component-price'>{price[0].currency.symbol + price[0].amount}</p>
                                            <div className='cart-component-attributes'>
                                                {item.attributes.map(attr => {
                                                    if(attr.type == 'swatch'){
                                                        return (                                    
                                                            <div className='cart-component-atribute-section' key={attr.id}>
                                                                <p key={attr.id}>{attr.name}:</p>
                                                                <div className='cart-component-attribute-container'>
                                                                    {attr.items.map(attrItem => {
                                                                        const attrObj = cartItem.attributes.find(attrName => {
                                                                            if(attrName.name == attr.name){
                                                                                return {attrName}
                                                                            }
                                                                        })
                                                                        return (
                                                                            <div key={attrItem.id} className={attr.name == attrObj.name && attrItem.value == attrObj.value ? 'cart-color-selected': 'cart-color-unselected'}>   
                                                                                <div className='cart-color' style={{"background": attrItem.value}} onClick={() => {
                                                                                }}></div>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>
                                                        )
                                                    }else{
                                                        return (                                    
                                                            <div className='cart-component-atribute-section' key={attr.id}>
                                                                <p key={attr.id}>{attr.name}:</p>
                                                                <div className='cart-component-attribute-container'>
                                                                    {attr.items.map(attrItem => {
                                                                        const attrObj = cartItem.attributes.find(attrName => {
                                                                            if(attrName.name == attr.name){
                                                                                return {attrName}
                                                                            }
                                                                        })
                                                                        return <div className={attr.name == attrObj.name && attrItem.value == attrObj.value ? 'cart-selected-item' :'cart-attribute-item'} 
                                                                        key={attrItem.id} >{attrItem.displayValue}</div>
                                                                    })}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    
                                                })}
                                            </div>
                                        </div>
                                        <div className='cart-component-right'>
                                            <div className='cart-middle-component'>
                                                <div className='cart-sign' onClick={() => {
                                                    this.plusButton(item, item.prices, cartItem)
                                                                    
                                                }}>+</div>
                                                <div className='cart-quantity'>{cartItem.quantity}</div>
                                                <div className='cart-sign' onClick={() => {
                                                    if(cartItem.quantity > 0){
                                                        this.minusButton(item, item.prices, cartItem)
                                                    }
                                                }}>-</div>
                                            </div>
                                            <div className='cart-img'>
                                                <img className='cart-images' src={this.state.cartItems[id].images[this.state.cartItems[id].counter]} />
                                                <div id='next' className='cart-images-buttons' onClick={() => {
                                                    const counter = (this.state.cartItems[id].counter + 1) % this.state.cartItems[id].images.length
                                                    this.setState({cartItems: {...this.state.cartItems, [id]: {...this.state.cartItems[id], counter: counter}}})
                                                    
                                                }}>
                                                    {">"}
                                                </div>
                                                <div id='previous' className='cart-images-buttons' onClick={() => {
                                                    if(this.state.cartItems[id].counter == 0){
                                                        const counter = this.state.cartItems[id].images.length-1
                                                        this.setState({cartItems: {...this.state.cartItems, [id]: {...this.state.cartItems[id], counter: counter}}})
                                                    }else{
                                                        const counter = (this.state.cartItems[id].counter - 1) % this.state.cartItems[id].images.length
                                                        this.setState({cartItems: {...this.state.cartItems, [id]: {...this.state.cartItems[id], counter: counter}}})
                                                    }
                                                }}>
                                                    {"<"}
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                        )
                                    }
                                    
                                })
                            )
                        })}
                        
                        
                        
                    </div>{
                        this.props.cartItems.length > 0 && (
                            <div className='cart-component-total'>
                                <p><span>Tax 21%:</span>{this.props.currency + this.props.tax.toFixed(2)}</p>
                                <p><span>Quantity:</span>{quantity}</p>
                                <p><span>Total:</span>{this.props.currency + (this.props.totalPrice + this.props.tax).toFixed(2)}</p>
                                <div className='order-button'>order</div>
                            </div>
                        )
                    }
                </div>
            )
        }else{
            return 'loading'
        }
        
    }
}
export default Cart;