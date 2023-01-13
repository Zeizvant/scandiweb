import './category.css';
import { PureComponent } from 'react';
import { useParams } from 'react-router-dom';

class Category extends PureComponent {
    render(){
        return (
            <div className='category'>
                <h1>{this.props.params.category}</h1>
            </div>
        )
        
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

export default withRouter(Category)