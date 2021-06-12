import React from 'react';
import RelatedItemCard from './relatedItemCard.jsx';

class RelatedItemsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
    this.dataArray = [];
  }

  componentDidMount() {
    this.setState({
      relatedItemsData: this.props.data
    });
    this.dataArray = Object.values(this.props.data);
    console.log('Props', this.props.data);
    console.log('dataArray', this.dataArray);
  }

  render() {
    console.log('render data array', this.dataArray);
    return (
      <div id="relatedItemsList">
        This is the Related Items List
        {this.dataArray.map((item) => (<div><RelatedItemCard data={item} /></div>))}
      </div>
    )
  }
}

export default RelatedItemsList;