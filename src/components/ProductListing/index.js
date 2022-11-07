import { PureComponent } from 'react';
import './productListing.css';
import ProductCard from '../ProductCard';

class ProductListing extends PureComponent {
    render(){
        return (
            <div className='product-listing'>
                {this.props.data.map((item) => {
                    const price = item.prices.filter(price => price.currency.symbol == this.props.currency)
                    console.log(price[0].amount)
                    return <ProductCard 
                    key={item.id} 
                    name={item.name}
                    price={price[0].currency.symbol + price[0].amount} 
                    img={item.gallery[0]}
                />
                })}
            </div>
        )
    }
}

export default ProductListing;