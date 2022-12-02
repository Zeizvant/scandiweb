import './category.css';
import { PureComponent } from 'react';

class Category extends PureComponent {
    render(){
        return (
            <div className='category'>
                <h1>{this.props.category}</h1>
            </div>
        )
        
    }
}

export default Category;