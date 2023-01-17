import './App.css';
import React, { PureComponent } from 'react';
import Menu from './components/Menu';
import ProductListing from './components/ProductListing';
import ProductDescription from './components/ProductDescription'
import Category from './components/Category';
import Cart from './components/Cart'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Context from './Context';


const client = new ApolloClient({
  uri: 'http://192.168.1.2:4000',
  cache: new InMemoryCache(),
})




class App extends PureComponent {

  /**
   * Main app component which renders Menu, Category, ProductListing, ProductDescription, Cart components
   */

  constructor(props){
    super(props)
    this.state = {
      data: {}, 
      currency: ['$'],
      cartItems: [],
      totalPrice: 0,
      categories: [],
      tax: 0,
      quantity: 0
    }
    this.changeCurrency = this.changeCurrency.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
    this.countTotal = this.countTotal.bind(this)
    this.changeCartItem = this.changeCartItem.bind(this)
  }

  changeCurrency(currency){
    this.setState({currency: currency})
    window.localStorage.setItem('currency', currency)
  }

  countTotal(){
    let tax = 0;
    let total = 0;
    let quantity = 0;
    for(let i = 0; i<this.state.cartItems.length; i++){
      const price = this.state.cartItems[i].price.filter(price => price.currency.symbol == this.state.currency)
      total += (price[0].amount * this.state.cartItems[i].quantity)
      quantity += this.state.cartItems[i].quantity
    }
    tax = total * 21 / 100
    this.setState({totalPrice: total, tax: tax, quantity: quantity})
    window.localStorage.setItem("cart-items", JSON.stringify(this.state.cartItems))
  }

  addToCart(item){
    const array = this.state.cartItems;
    let found = false;
    if(this.state.cartItems.length > 0){
      for(let i = 0; i<this.state.cartItems.length; i++){
        if(this.state.cartItems[i].longId == item.longId){
          let quantity = this.state.cartItems[i].quantity + 1;
          array[i] = {...item, quantity: quantity};
          this.setState({cartItems: [...array]})
          found = true
          break
        }
      }
      if(!found){
        array.push({...item, quantity: 1})
        this.setState({cartItems: [...array]})
      }
    }else{
      this.setState({cartItems: [...this.state.cartItems, {...item, quantity: 1}]})
    }
  }


  changeCartItem(item){
    let found = false
    let array = this.state.cartItems
    for(let i=0;i<this.state.cartItems.length;i++ ){
      if(this.state.cartItems[i].longId == item.longId){
        let quantity = this.state.cartItems[i].quantity + 1
        array[i] = {...item, quantity: quantity}
        this.setState({cartItems: array})
        found = true
        break
      }
    }
    if(!found){
      array.push({...item, quantity: 1})
      this.setState({cartItems: [...array]})
    }
  }

  removeFromCart(item){
    let array = this.state.cartItems;
    if(this.state.cartItems.length > 0){
      for(let i = 0; i<this.state.cartItems.length; i++){
        if(this.state.cartItems[i].longId == item.longId){
          if(this.state.cartItems[i].quantity == 1){
            array = array.slice(0, i).concat(array.slice(i+1))
            this.setState({cartItems: [...array]})
          }else if(this.state.cartItems[i].quantity>0){
            let quantity = this.state.cartItems[i].quantity - 1;
            array[i] = {...item, quantity: quantity};
            this.setState({cartItems: [...array]})
          }  
        }
      }
    }
  }

  componentDidUpdate(){
    this.countTotal()
  }

  componentDidMount(){
    
    const client = new ApolloClient({
      uri: 'http://192.168.1.2:4000',
      cache: new InMemoryCache()
    })

    client.query({
      query: gql`
      query {
        categories{
          name
        },
        category{
          products{
            id
            name
            prices{
              amount,
              currency{
                symbol,
              }
            }
            inStock
            category
            gallery
            brand
            description
            attributes{
              id
              name,
              type,
              items{
                displayValue,
                value,
                id
              }
            }
          }
        }
      }
      `
    }).then((result) => {
      this.setState({data: result.data.category.products, categories: result.data.categories})
      const currency = window.localStorage.getItem('currency')
      if(currency !== null){
        this.setState({currency: [currency]})
      }
      const cartItems = JSON.parse(window.localStorage.getItem('cart-items'))
      if(cartItems !== null){
        this.setState({cartItems: [...cartItems]})
      }
    })
    
  }

  render(){
    return (
      <div className='main'>
        <Context.Provider value={{
          changeCurrency: this.changeCurrency,
          currency: this.state.currency,
          data: this.state.data,
          cartItems: this.state.cartItems,
          addToCart: this.addToCart,
          removeFromCart: this.removeFromCart,
          totalPrice: this.state.totalPrice,
          categories: this.state.categories,
          quantity: this.state.quantity,
          changeCartItem: this.state.changeCartItem,
          totalPrice: this.state.totalPrice,
          tax: this.state.tax,
          changeCartItem: this.changeCartItem
        }}>
          <Router>
            <Menu />
            <div className='body-main'>
                <div className='overlay'>

                </div>
                <Routes>  
                  <Route exact path="/" element={<Navigate to='/all'/>} />
                  <Route path="/:category" element={[<Category />, 
                    <ProductListing />
                  ]}
                  />
                  <Route path='/details/:name' element={
                    <ProductDescription />}
                  />
                  <Route path='/cart' element={
                    <Cart 
                      data={this.state.data} 
                      cartItems={this.state.cartItems}
                    />} />
                </Routes>
              
            </div>
          </Router>
        </Context.Provider>
      </div>
    )
  }
}

export default App;
