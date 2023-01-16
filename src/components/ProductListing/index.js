import { PureComponent } from 'react';
import './productListing.css';
import ProductCard from '../ProductCard';
import { useParams } from 'react-router-dom';

class ProductListing extends PureComponent {

    render(){
        if(this.props.data[0] != undefined){
            console.log(this.props.data)
            return (
                <div className='product-listing'>
                    {this.props.data.map((item) => {
                        const price = item.prices.filter(price => price.currency.symbol == this.props.currency)
                        if(this.props.params.category === "all"){
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
                                brand={item.brand}
                                />
                        }
                        if(item.category === this.props.params.category){
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
                                brand={item.brand}
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

const withRouter = WrapperComponent => props => {
    const params = useParams();
    return (
        <WrapperComponent 
            {...props}
            params={params}
        />
    )
}

export default withRouter(ProductListing);