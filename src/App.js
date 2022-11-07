import './App.css';
import { PureComponent } from 'react';
import Menu from './components/Menu';
import ProductCard from './components/ProductCard';
import ProductListing from './components/ProductListing';
import Category from './components/Category';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';


const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})



class App extends PureComponent {

  constructor(props){
    super(props)
    this.state = {data: [], currency: ['$']}
    this.changeCurrency = this.changeCurrency.bind(this)
  }

  changeCurrency(currency){
    this.setState({currency: currency})
  }

  componentDidMount(){
    
    const client = new ApolloClient({
      uri: 'http://localhost:4000',
      cache: new InMemoryCache()
    })

    client.query({
      query: gql`
      query {
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
            gallery
          }
        }
      }
      `
    }).then((result) => {
      this.setState({data: result.data.category.products})
    })
    
  }

  render(){
    console.log(this.state.data)
    return (
      <div className='main'>
        <Menu changeCurrency={this.changeCurrency} currency={this.state.currency}/>
        <hr />
        <Category />
        <hr />
        <ProductListing data={this.state.data} currency={this.state.currency}/>
        
        
      </div>
    )
  }
}

export default App;
