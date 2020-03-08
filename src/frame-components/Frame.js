import React from 'react';
import Time from './Time.js'

class Frame extends Component {
    state = {
        duration: 0
      }

    handleChange = value => {
        const duration = this.state.duration;
        duration = value;
        this.setState({duration});
    }
    
    render() { 
        return (  );
    }
}
 
export default Frame;