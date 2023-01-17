import React from 'react'
import { PureComponent } from 'react';
import './productDescription.css';
import { Interweave } from 'interweave';
import { useParams } from 'react-router-dom';
import Context from '../../Context';

class ProductDescription extends PureComponent {

    static contextType = Context

    constructor(props){
        super(props)
        this.state = {mainImg: '', Color: '', submitEnable: false}
    }

    componentDidUpdate(){
        const item = this.context.data.find(item => {
            return item.id == this.props.params.name;
        })
        let counter = 0;
        for(let i = 0; i < item.attributes.length; i++){
            if(this.state[item.attributes[i].name] !== "" && this.state[item.attributes[i].name] !== undefined){
                counter++
            }
        }
        if(counter === item.attributes.length){
            this.setState({submitEnable: true})
        }
    }

    render(){
        if (this.context.data[0] != undefined){
            const item = this.context.data.find(item => {
                return item.id == this.props.params.name;
            })
            const images = item.gallery
            const price = item.prices.filter(price => price.currency.symbol == this.context.currency)
            return (               
                <div className='product-description-container'>
                    <div className='images'>
                        {images.map(photo => {
                            return <img key={photo} src={photo} alt={item.name} onClick={(event) => {
                                this.setState({mainImg: event.target.src})
                            }}/>
                        })}
                    </div>
                    <div className='main-image'>
                        <img className={!item.inStock? 'out' : ""} src={this.state.mainImg || images[0]}  alt={item.name}/>
                        {!item.inStock && <div className='description-stock-text'>OUT OF STOCK</div>}
                    </div>
                    <div className='product-description-section'>
                        <h2 className='product-description-header'>{item.brand}</h2>
                        <p className='product-description-name'>{item.name}</p>
                        <div>
                            {item.attributes.map(attr => {
                                if(attr.type == 'swatch'){
                                    return (                                    
                                        <div className='product-description-atribute-section' key={attr.id}>
                                            <p className='attribute-name' key={attr.id}>{attr.name}:</p>
                                            <div className='attribute-container'>
                                                {attr.items.map(item => {
                                                    return (
                                                        <div key={item.id} className={this.state.Color == item.value ? 'color-selected': 'color-unselected'}>   
                                                            <div className='color' style={{"background": item.value}} onClick={() => {
                                                                this.setState({Color: item.value})
                                                            }}></div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                }else{
                                    return (                                    
                                        <div className='product-description-atribute-section' key={attr.id}>
                                            <p className='attribute-name' key={attr.id}>{attr.name}:</p>
                                            <div className='attribute-container'>
                                                {attr.items.map(item => {
                                                    return <div className={this.state[attr.name] == item.value ? 'selected-item' :'attribute-item'} key={item.id} onClick={() => {
                                                        this.setState({[attr.name]: item.value})
                                                        
                                                    }}>{item.displayValue}</div>
                                                })}
                                            </div>
                                        </div>
                                    )
                                }
                                
                            })}
                        </div>
                        <div className='product-description-price-container'>
                            <p className='attribute-name'>Price:</p>
                            <p className='product-description-price'>{price[0].currency.symbol + price[0].amount.toFixed(2)}</p>
                        </div>
                        <div className={item.inStock ? 'add-to-cart-button' :'add-to-cart-button disabled' } onClick={(event) => {
                            if(item.inStock && this.state.submitEnable){
                                let id = item.id
                                this.context.changeCartItem({
                                id: item.id,
                                name: item.name,
                                price: item.prices,
                                attributes: item.attributes.map(attrItem => {
                                    id += this.state[attrItem.name]
                                    return {name: attrItem.name, value: this.state[attrItem.name]}
                                }),
                                longId: id
                            })
                            }
                            
                        }}>ADD TO CART</div>
                        
                        <div className='product-description-text' >
                            <Interweave content={item.description} />
                            
                        </div>
                    </div>
                </div>
            )
        } else{
            return 'loading';
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

export default withRouter(ProductDescription);