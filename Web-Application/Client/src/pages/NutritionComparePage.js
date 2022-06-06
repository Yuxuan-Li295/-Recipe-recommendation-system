/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import '../assets/nutrition.css';
import {
  Row, Col,
} from 'antd';
import {
  Form, FormInput, FormGroup, Button,
} from 'shards-react';
// component that wraps series, axis and grids, hints, etc
// and seamlessly provides necessary dimensions, sizes and scales into its children
// Also add the component that enable showing the verticalbars when
// compare with different ingredients in recipes.
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
} from 'react-vis';

import { getNutrition } from '../fetcher';
import MenuBar from '../components/MenuBarMainDish';

// eslint-disable-next-line import/no-unresolved
const calculateCorrelation = require('calculate-correlation');

// define the title of a specific data columns
// with the RecipeName as stored as the key value.
// key is for react, and dataindex is for data accessing.
// With two 'recipe name' variable start with the null value
// Two null charts variable.
class PersonReviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: 0,
      recipeName1: '',
      recipeName2: '',
      chart1: [],
      chart2: [],
    };
    this.updateSearchResults = this.updateSearchResults.bind(this);
    this.handleRecipeName1Change = this.handleRecipeName1Change.bind(this);
    this.handleRecipeName2Change = this.handleRecipeName2Change.bind(this);
  }

  handleRecipeName1Change(event) {
    this.setState({ recipeName1: event.target.value });
  }

  handleRecipeName2Change(event) {
    this.setState({ recipeName2: event.target.value });
  }

  // Define the method for get the nutrition of the recipe by push the
  // corresponding value one by one and then store them in a
  // dictionary.
  async updateSearchResults() {
    const nutrition1 = [];
    const nutrition2 = [];
    await getNutrition(this.state.recipeName1).then((res) => {
      nutrition1.push(res.results[0].Calorie_PDV);
      nutrition1.push(res.results[0].Carbohydrates_PDV);
      nutrition1.push(res.results[0].Protein_PDV);
      nutrition1.push(res.results[0].Saturated_Fat_PDV);
      nutrition1.push(res.results[0].Sodium_PDV);
      nutrition1.push(res.results[0].Sugar_PDV);
      nutrition1.push(res.results[0].Total_Fat_PDV);
      const data = [
        { x: 'Calorie', y: nutrition1[0] },
        { x: 'Carbohydrates', y: nutrition1[1] },
        { x: 'Protein', y: nutrition1[2] },
        { x: 'Saturated_Fat', y: nutrition1[3] },
        { x: 'Sodium', y: nutrition1[4] },
        { x: 'Sugar', y: nutrition1[5] },
        { x: 'Total_Fat', y: nutrition1[6] },
      ];
      this.setState({ chart1: data });
    });
    await getNutrition(this.state.recipeName2).then((res) => {
      nutrition2.push(res.results[0].Calorie_PDV);
      nutrition2.push(res.results[0].Carbohydrates_PDV);
      nutrition2.push(res.results[0].Protein_PDV);
      nutrition2.push(res.results[0].Saturated_Fat_PDV);
      nutrition2.push(res.results[0].Sodium_PDV);
      nutrition2.push(res.results[0].Sugar_PDV);
      nutrition2.push(res.results[0].Total_Fat_PDV);
      const data = [
        { x: 'Calorie', y: nutrition2[0] },
        { x: 'Carbohydrates', y: nutrition2[1] },
        { x: 'Protein', y: nutrition2[2] },
        { x: 'Saturated_Fat', y: nutrition2[3] },
        { x: 'Sodium', y: nutrition2[4] },
        { x: 'Sugar', y: nutrition2[5] },
        { x: 'Total_Fat', y: nutrition2[6] },
      ];
      this.setState({ chart2: data });
    });
    const config = {
      decimals: 2,
    };
    const correlation = calculateCorrelation(nutrition1, nutrition2, config);
    this.setState({ results: correlation });
  }
  //   componentDidMount() {
  //     getPersonReview(this.state.selectedUserId).then((res) => {
  //       this.setState({ selectedProfileDetails: res.results });
  //     });
  //   }

  render() {
    return (
      <div>
        <MenuBar />
        <div className="recommandation-curtain">
          <div className="tip">
            Please enter two different recipe names
            {'\n'}
            Our system will give you detailed comparison on the nutrition of both recipe
            {'\n'}
            Our system will also compute the similarity for between the two recipe
          </div>
        </div>
        <div>
          <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
            <Row>
              <Col flex={2}>
                <FormGroup style={{ width: '30vw', margin: '0 auto' }}>
                  <label>Recipe Name 1</label>
                  <FormInput placeholder="15 minute beef stew" value={this.state.recipeName1} onChange={this.handleRecipeName1Change} />
                </FormGroup>

              </Col>
              <Col flex={2}>
                <FormGroup style={{ width: '30vw', margin: '0 auto' }}>
                  <label>Recipe Name 2</label>
                  <FormInput placeholder="10 minute smothered chicken" value={this.state.recipeName2} onChange={this.handleRecipeName2Change} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col flex={2} align="right">
                <FormGroup style={{ width: '10vw' }}>
                  <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
          {/* Using the XYPLOT to show a bar plot for each given recipe with the
          value of each of the nutrition.
                */}
          <Row gutter={[8, 16]}>
            <Col span={12} align="middle">
              {this.state.recipeName1}
              <div>
                <XYPlot xType="ordinal" width={400} height={450} xDistance={200} margin={{ left: 100, bottom: 150 }}>
                  <VerticalGridLines />
                  <HorizontalGridLines />
                  <XAxis tickLabelAngle={-90} position="left" tickPadding={10} />
                  <YAxis />
                  <VerticalBarSeries className="vertical-bar-series-example" data={this.state.chart1} />
                </XYPlot>
              </div>
            </Col>
            <Col span={12} align="middle">
              {this.state.recipeName2}
              <XYPlot xType="ordinal" width={400} height={450} xDistance={200} margin={{ left: 100, bottom: 150 }}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis tickLabelAngle={-90} position="left" tickPadding={10} />
                <YAxis />
                <VerticalBarSeries className="vertical-bar-series-example" data={this.state.chart2} />
              </XYPlot>
            </Col>
          </Row>
          {/* Calculate the similarity between two recipes with the similarity value calculated
          and stored in the reslults variabel for the state.
                */}
          <div className="nutrition-curtain">
            <div className="corr">
              The similarity between the two recipe is:
              {'\n'}
              {this.state.results}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PersonReviewPage;
