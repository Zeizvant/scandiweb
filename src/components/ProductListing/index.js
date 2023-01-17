import { PureComponent } from 'react';
import './productListing.css';
import ProductCard from '../ProductCard';
import { useParams } from 'react-router-dom';
import Context from '../../Context';

class ProductListing extends PureComponent {

    static contextType = Context

    render(){
        if(this.context.data[0] != undefined){
            return (
                <div className='product-listing'>
                    {this.context.data.map((item) => {
                        const price = item.prices.filter(price => price.currency.symbol == this.context.currency)
                        if(this.props.params.category === "all"){
                            return <ProductCard 
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                amount={item.prices}
                                price={price[0].currency.symbol + (price[0].amount.toFixed(2))} 
                                img={item.gallery[0]}
                                inStock={item.inStock}
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
                                price={price[0].currency.symbol + price[0].amount.toFixed(2)}
                                img={item.gallery[0]}
                                inStock={item.inStock}
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