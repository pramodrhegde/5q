import React from 'react';
import rd3 from 'react-d3';
let PieChart = rd3.PieChart;

export default class ResultsChart extends React.Component {

  render() {
    return <PieChart
      data={this.props.data}
      width={260}
      height={260}
      radius={130}
      innerRadius={0}/>;
  }
}
