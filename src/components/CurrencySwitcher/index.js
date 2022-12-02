import { PureComponent } from 'react';
import './currencySwitcher.css';
import downArrow from '../../images/down_arrow.png';
import upArrow from '../../images/up_arrow.png';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'


const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
})

class CurrencySwitcher extends PureComponent {

    constructor(props){
        super(props)
        this.state = {currencies: [], arrowClicked: false}
        
    }

    componentDidMount(){

        document.addEventListener('click', (event) => {
            if((!document.querySelector(".currency-dropdown").contains(event.target) && 
            this.state.arrowClicked && event.target.id != 'up-arrow')){
                document.querySelector(".currency-dropdown").style.display = 'none';
                this.setState({arrowClicked: false})
                
            }
        })

        client.query({
            query: gql`
            query {
                currencies{
                  symbol,
                  label
                }
              }
            `
        }).then(result => {
            this.setState({currencies: result.data.currencies})
        })
    }

    componentWillUnmount(){
        document.removeEventListener('click')
    }


    render(){
        
        return (
            
            <div className='currency-switcher'>
                <p className='currency-symbol'>{this.props.currency}</p>
                <div className='currency-container'>
                    {this.state.arrowClicked ? 
                        <img id='up-arrow' src={upArrow} alt='up arrow' onClick={() => {
                            const dropDownMenu = document.querySelector(".currency-dropdown");
                            dropDownMenu.style.display = "none";
                            this.setState({arrowClicked: false})
                        }}/> 
                        :
                        <img id='down-arrow' src={downArrow} alt='down arrow' onClick={() => {
                            const dropDownMenu = document.querySelector(".currency-dropdown");
                            dropDownMenu.style.display = "block";
                            this.setState({arrowClicked: true})
                        }}/> 
                        
                    }
                    
                    <ul className='currency-dropdown'>
                        {this.state.currencies.map((currency) => {
                            return (
                            <li key={currency.symbol} onClick={(event => {
                                this.props.changeCurrency(currency.symbol)
                                const dropDownMenu = document.querySelector(".currency-dropdown");
                                dropDownMenu.style.display = "none";
                                this.setState({arrowClicked: false})
                                
                            })}>
                                {currency.symbol + " " + currency.label}
                            </li>
                            )
                        })}  
                    </ul>
                </div>
                
            </div>
        )
        
    }
}
export default CurrencySwitcher;