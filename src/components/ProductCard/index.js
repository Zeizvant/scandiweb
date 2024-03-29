import { PureComponent } from 'react';
import './productCard.css'
import cart from '../../images/cart.png'
import {Link} from 'react-router-dom'   
import Context from '../../Context';



class ProductCard extends PureComponent {

    static contextType = Context
    
    render(){
        return (
            <div className='product-card'>
                {
                this.props.inStock ? 
                    <Link to={`/details/${this.props.id}`} >
                        <img className='product-image' src={this.props.img} alt='product'/>
                    </Link>
                    
                    :
                    <Link to={`/details/${this.props.id}`} >
                        <img className='product-image out' src={this.props.img} alt='product'/>
                        <div className='stock-text'>OUT OF STOCK</div>
                    </Link>
                }
                
                <img className={'cart-image'} src={cart} alt='add to cart image' onClick={() => {
                    if(this.props.inStock == true){
                        let id = this.props.id
                        this.context.addToCart({
                            id: this.props.id,
                            name: this.props.name,
                            price: this.props.amount,
                            attributes: this.props.attributes.map(item => {
                                id += item.items[0].value
                                return {name: item.name, value: item.items[0].value}
                            }),
                            longId: id
                        })
                    }
                }}/>
                <p className={this.props.inStock? 'product-name-card' : 'product-name-card out'}>
                    {this.props.brand + " " + this.props.name }
                </p>
                <p className={this.props.inStock ? 'product-price-card' : 'product-price-card out'}>
                    {this.props.price}
                </p>
            </div>
        )
    }
}

export default ProductCard;