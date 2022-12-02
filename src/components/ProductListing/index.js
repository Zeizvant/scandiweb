import { PureComponent } from 'react';
import './productListing.css';
import ProductCard from '../ProductCard';

class ProductListing extends PureComponent {

    render(){
        if(this.props.data[0] != undefined){
            return (
                <div className='product-listing'>
                    {this.props.data.map((item) => {
                        const price = item.prices.filter(price => price.currency.symbol == this.props.currency)
                        if(this.props.category !== 'all'){
                            if(item.category == this.props.category){
                                return <ProductCard 
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    amount={item.prices}
                                    price={price[0].currency.symbol + price[0].amount} 
                                    img={item.gallery[0]}
                                    inStock={item.inStock}
                                    addToCart={this.props.addToCart}
                                    attributes={item.attributes}
                                    />
                            }
                        }else{
                            return <ProductCard 
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    amount={item.prices}
                                    price={price[0].currency.symbol + price[0].amount} 
                                    img={item.gallery[0]}
                                    inStock={item.inStock}
                                    addToCart={this.props.addToCart}
                                    attributes={item.attributes}
                                    />
                        }
                        
                        
                    })}
                </div>
            )
        }else{
            return "loading"
        }
        
    }
}

export default ProductListing;