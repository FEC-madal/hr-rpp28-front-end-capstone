import React from 'react';
import axios from 'axios';
import Photobar from '../Photobar/photobar.jsx';

class SingleAnswerBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      reported: false,
    };

  }

  componentDidMount() {
    this.setState({answer: this.props.answer})

  }

  handleHelpful = event => {
    axios.put(`http://localhost:3000/qa/answers/${this.state.answer.id}/helpful`)
    .then((response) => {
      console.log('SingleAnswerBar helpful clicked, sent to server, returned with', response.data);
      this.props.refresh();
    })
    .catch(err => {
      console.log('Error in singleanswerbar component, handleHelpful event handler: ', err);

    });
  }

  handleReport = event => {
    console.log('is it calling the event handler: ');
    axios.put(`http://localhost:3000/qa/answers/${this.state.answer.id}/report`)
    .then((response) => {
      // console.log('report clicked, sent to server, returned with', response.data);
      this.setState({reported: true});
      //console.log('is it callign the axios put call');
    })
    .catch(err => {
      console.log('Error in singleanswerbar component, handleReport event handler: ', err);
    });
  }

  render () {
    let notReportedTag = <span id='reportanswer' onClick = {this.handleReport.bind(this)}>Report</span>;
    let reportedTag = <span>Reported</span>

    const date = new Date(this.props.answer.date.toString()).toLocaleString('en-us', {month: 'long', day: 'numeric', year : 'numeric'});

    return (
      <div>
        <br></br>
        <div className='qa_atext'>A: {this.state.answer.body} </div>

        <div className='qa_atext2'>
            <span>By {this.props.answer.answerer_name}, {date}  </span>

            <span>| helpful? </span>
            <span id='helpfulanswer' onClick={this.handleHelpful.bind(this)}>Yes({this.props.answer.helpfulness})</span>
            <span> | </span>
            {this.state.reported ? reportedTag : notReportedTag}

        </div>
        <div className='qa_atext2'>
          <Photobar photos={this.state.answer.photos}/>
        </div>
      </div>
    )
  }
}

export default SingleAnswerBar;

//note to self, the original code:
// {this.state.answer.date.substring(0,10)} broke everything after i changed
// this.state = {
//   answer: '',
//   reported: false,
// };

// apparent at this initial rendering in the lifecycle, this.state.answer.date.substring is not yet available as a method.
// therefore calling this.state.answer.date = 'STRING'; in componentdidmount is not "soon enough" because that is called only if
// if the item is successfully mounted.

// we also managed to solve the issue of why it was not changing, by having the values of the properties depend on props
// rather than on state.