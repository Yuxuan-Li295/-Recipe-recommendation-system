/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import necessary function component from shards-react
import {
  Form, FormInput, FormGroup, Button, Card, CardBody, Progress,
} from 'shards-react';
// import the component for defefine new row, column, divider between blocks,
// and the slide bar from the 'antd'
import {
  Table,
  Row,
  Col,
  Divider,
  Slider,
} from 'antd';
// import { RadarChart } from 'react-vis';
// import { format } from 'd3-format';
import MenuBar from '../components/MenuBarMainDish';
import { getDish, getDishesSearch } from '../fetcher';

// const wideFormat = format('.3r');
// construct the column for display the recipe details including
// name, recipeID, averagerating and the number of reviews.
const playerColumns = [
  {
    // define the title of a specific data columns
    // with the RecipeName as stored as the key value.
    // key is for react, and dataindex is for data accessing.
    title: 'RecipeName',
    dataIndex: 'RecipeName',
    key: 'RecipeName',
    // By adding the 'sorter' the column value is enable to
    // be sort either ascending or descending.
    sorter: (a, b) => a.RecipeName.localeCompare(b.RecipeName),
    // Creat a super link with the link name set to different
    // according to the recipeName
    render: (text, row) => <a href={`/maindishes?name=${row.RecipeName}`}>{text}</a>,
  },
  {
    title: 'RecipeID',
    dataIndex: 'RecipeID',
    key: 'RecipeID',
    // For the sorting function of the recipeId, it is sorted based on the difference
    // Of the corresponding numerical ID value.
    sorter: (a, b) => a.RecipeID - b.RecipeID,
  },
  {
    title: 'AVGRating',
    dataIndex: 'AVGRating',
    key: 'AVGRating',
    sorter: (a, b) => a.AVGRating - b.AVGRating,
    render: (text, row) => <a href={`/review/maindishes?recipeName=${row.RecipeName}`}>{text}</a>,
  },
  {
    title: 'NumReview',
    dataIndex: 'NumReview',
    key: 'NumReview',
    sorter: (a, b) => a.NumReview - b.NumReview,
  },

];

// Define the maindish class with the constructor contain the state variable,
// Class component and functions.
class MainDishes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameQuery: '',
      ingredient: '',
      totalTimeLow: '',
      totalTimeHigh: 30,
      ratingLow: 4,
      ratingHigh: 5,
      // Use the attribute to obtain the address of the URL of the page
      // With a default URL link specified.
      selectedPlayerId: window.location.search ? window.location.search.substring(1).split('=')[1] : 'a jad   cucumber pickle',
      selectedPlayerDetails: null,
      dishesResults: [],

    };
    // Monitor URL Parameter changes.
    this.updateSearchResults = this.updateSearchResults.bind(this);
    this.handleNameQueryChange = this.handleNameQueryChange.bind(this);
    this.handleIngredientQueryChange = this.handleIngredientQueryChange.bind(this);
    this.handleRateQueryChange = this.handleRateQueryChange.bind(this);
    this.handleTotalTimeQueryChange = this.handleTotalTimeQueryChange.bind(this);
  }

  // Called immediately after the component is mounted (inserted into the DOM tree).
  // The render() method is the only method that must be implemented in class components,
  // and other methods can be implemented according to their own needs.
  componentDidMount() {
    getDishesSearch(
      this.state.nameQuery,
      this.state.ingredient,
      this.state.totalTimeLow,
      this.state.totalTimeHigh,
      this.state.ratingLow,
      this.state.ratingHigh,
      null,
      null,
    ).then((res) => {
      this.setState({ dishesResults: res.results });
    });
    getDish(this.state.selectedPlayerId).then((res) => {
      this.setState({ selectedPlayerDetails: res.results[0] });
    });
  }

  handleNameQueryChange(event) {
    this.setState({ nameQuery: event.target.value });
  }

  handleIngredientQueryChange(event) {
    // update state variables appropriately. See handleNameQueryChange(event) for reference
    this.setState({ ingredient: event.target.value });
  }

  handleTotalTimeQueryChange(value) {
    // update state variables appropriately. See handleNameQueryChange(event) for reference
    this.setState({ totalTimeLow: value[0] });
    this.setState({ totalTimeHigh: value[1] });
  }

  handleRateQueryChange(value) {
    this.setState({ ratingLow: value[0] });
    this.setState({ ratingHigh: value[1] });
  }

  updateSearchResults() {
    getDishesSearch(
      this.state.nameQuery,
      this.state.ingredient,
      this.state.totalTimeLow,
      this.state.totalTimeHigh,
      this.state.ratingLow,
      this.state.ratingHigh,
      null,
      null,
    ).then((res) => {
      this.setState({ dishesResults: res.results });
    });
    getDish(this.state.selectedPlayerId).then((res) => {
      this.setState({ selectedPlayerDetails: res.results[0] });
    });
  }

  render() {
    return (

      <div>
        <MenuBar />
        {/* Create two search buttons for inputs for the recipe recommendation,
        using the elements and style
        we followed in the above two columns. Use the onChange method (handleClubQueryChange)  */}
        <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
          <Row>
            <Col flex={2}>
              <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                <label>Name</label>
                <FormInput placeholder="Name" value={this.state.nameQuery} onChange={this.handleNameQueryChange} />
              </FormGroup>

            </Col>
            <Col flex={2}>
              <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                <label>Ingredient</label>
                <FormInput placeholder="Ingredient" value={this.state.ingredient} onChange={this.handleIngredientQueryChange} />
              </FormGroup>

            </Col>
            <Col flex={2}>
              <FormGroup style={{ width: '10vw' }}>
                <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
              </FormGroup>

            </Col>

          </Row>
          <br />
          <Row>
            <Col flex={2}>
              {/* Create slider for serach recipe by given the  range defined for rating
              and totaltime, also with 'onChange' method */}
              <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                <label>Rating</label>
                <Slider
                  range
                  defaultValue={[4, 5]}
                  step={0.1}
                  max={5}
                  onChange={this.handleRateQueryChange}
                />

              </FormGroup>

            </Col>
            <Col flex={2}>
              <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                <label>Total Time</label>
                <Slider
                  range
                  defaultValue={[30, 180]}
                  max={500}
                  onChange={this.handleTotalTimeQueryChange}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
        <Divider />
        <Table style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} dataSource={this.state.dishesResults} columns={playerColumns} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} />
        <Divider />

        {this.state.selectedPlayerDetails ? (

          <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
            <Card style={{ width: '70vw', marginTop: '2vh' }}>
              <CardBody>
                <Row gutter="30" align="middle" justify="center">
                  <Col flex={2} style={{ textAlign: 'left' }}>
                    <h3>{this.state.selectedPlayerDetails.RecipeName}</h3>
                  </Col>
                </Row>

                <Row gutter="30" align="middle" justify="left">
                  <Col>
                    <h5>
                      Author:
                      {' '}
                      {this.state.selectedPlayerDetails.Author}
                    </h5>
                  </Col>
                  <Col>
                    <h5>
                      Estimated Total Time:
                      {' '}
                      {this.state.selectedPlayerDetails.Minutes}
                      minutes
                    </h5>
                  </Col>
                </Row>
                <br />
                <Col gutter="30" align="middle" justify="left">
                  <h6>Ingredients:</h6>
                  {' '}
                  {this.state.selectedPlayerDetails.Ingredients}
                </Col>
                <br />
                {/* Create card combined with the deatils of the recipes(author, ingredients,
                  estimated total time and the instructions) */}
                <Col gutter="30" align="middle" justify="left">
                  <h6>Instructions:</h6>
                  {' '}
                  {this.state.selectedPlayerDetails.Directions
                    .substring(1, this.state.selectedPlayerDetails.Directions.length - 1)}
                </Col>
                <br />
                {/* Create card combined with the deatils of the recipes(author, ingredients,
                  estimated total time and the instructions and the progrss graph for the nutrition
                  in the recipe.) */}
                <Col gutter="30" align="middle" justify="left">
                  <h6>AVGRating</h6>
                  <Progress max={5} style={{ width: '10vw' }} value={this.state.selectedPlayerDetails.Rate1}>{this.state.selectedPlayerDetails.Rate1}</Progress>
                </Col>
                <br />
                <Row gutter="30" align="middle" justify="left">
                  <Col flex={2} align="left" style={{ textAlign: 'left' }}>
                    <h6>Carbohydrates (PDV) </h6>
                    <Progress style={{ width: '10vw' }} value={this.state.selectedPlayerDetails.Carbohydrates}>{this.state.selectedPlayerDetails.Carbohydrates}</Progress>
                  </Col>
                  <Col flex={2} align="middle" style={{ textAlign: 'left' }}>
                    <h6>Protein (PDV) </h6>
                    <Progress style={{ width: '10vw' }} value={this.state.selectedPlayerDetails.Protein}>{this.state.selectedPlayerDetails.Protein}</Progress>
                  </Col>
                  <Col flex={2} align="right" style={{ textAlign: 'left' }}>
                    <h6>Saturated Fat (PDV) </h6>
                    <Progress style={{ width: '10vw' }} value={this.state.selectedPlayerDetails.SaturatedFat}>{this.state.selectedPlayerDetails.SaturatedFat}</Progress>
                  </Col>
                </Row>
                <Row gutter="30" align="middle" justify="left">
                  <Col flex={2} align="left" style={{ textAlign: 'left' }}>
                    <h6>Sodium (PDV) </h6>
                    <Progress style={{ width: '10vw' }} value={this.state.selectedPlayerDetails.Sodium}>{this.state.selectedPlayerDetails.Sodium}</Progress>
                  </Col>
                  <Col flex={2} align="middle" style={{ textAlign: 'left' }}>
                    <h6>Sugar (PDV) </h6>
                    <Progress style={{ width: '10vw' }} value={this.state.selectedPlayerDetails.Sugar}>{this.state.selectedPlayerDetails.Sugar}</Progress>
                  </Col>
                  <Col flex={2} align="right" style={{ textAlign: 'left' }}>
                    <h6>Total Fat (PDV) </h6>
                    <Progress style={{ width: '10vw' }} value={this.state.selectedPlayerDetails.TotalFat}>{this.state.selectedPlayerDetails.TotalFat}</Progress>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        ) : null}

      </div>
    );
  }
}

export default MainDishes;
