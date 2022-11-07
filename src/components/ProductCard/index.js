import { PureComponent } from 'react';
import './productCard.css'
import cart from '../../images/cart.png'


/**
 * ProductCard component returns div with img, name and price.
 * Takes props img, product, price
 */

class ProductCard extends PureComponent {
    render(){
        return (
            <div className='product-card'>
                <img className='product-image' src={this.props.img} alt='product'/>
                <img className='cart-image' src={cart} alt='add to cart image' />
                <p className='product-name-card'>{this.props.name}</p>
                <p className='product-price-card'>{this.props.price}</p>
            </div>
        )
    }
}

export default ProductCard;