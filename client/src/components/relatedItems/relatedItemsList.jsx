import React from 'react';
import RelatedItemCard from './relatedItemCard.jsx';

class RelatedItemsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
    this.dataArray = [];
    this.mappedReactData = this.mapData();
  }

  componentDidMount() {
    this.mapData();
  }

  mapData() {
    this.dataArray = Object.values(this.props.data);
    this.mappedReactData = this.dataArray.map((item) => <RelatedItemCard data={item} />);
  }

  render() {
    return (
      <div id="relatedItemsList">
        This is the Related Items List
        {this.dataArray.map((item) => <div><RelatedItemCard data={item} /></div>)}
      </div>
    );
  }
}

export default RelatedItemsList;