/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Form, FormInput, FormGroup, Button, Card, CardBody,
} from 'shards-react';

// Avatars can be found throughout material design, both in tables and in dialog menus
import {
  Table,
  Row,
  Col,
  Divider,
  Slider,
  Avatar,
  Comment,
} from 'antd';

import MenuBar from '../components/MenuBar';
import { getPastrySearch, getPastry, getReview } from '../fetcher';

// define the title of a specific data columns
// with the RecipeName as stored as the key value.
// key is for react, and dataindex is for data accessing.
// For the pastrypage, design to let it contain the corresponding recipename,
// author, cook prepare time, total time and average rating.
const recipeColumns = [
  {
    title: 'RecipeName',
    dataIndex: 'RecipeName',
    key: 'RecipeName',
    sorter: (a, b) => a.RecipeName.localeCompare(b.RecipeName),
    render: ((text, row) => {
      if (row.RecipeName) {
        return <a href={`/pastry?recipeName=${row.RecipeName || ''}`}>{text || ''}</a>;
      }
      return null;
    }),
  },
  {
    title: 'Author',
    dataIndex: 'Author',
    key: 'Author',
    sorter: (a, b) => a.Author.localeCompare(b.Author),
  },
  {
    // For the sorting function of the prepare time, it is sorted based on the difference
    // Of the corresponding numerical prepare time value.
    title: 'PrepareTime',
    dataIndex: 'PrepareTime',
    key: 'PrepareTime',
    sorter: (a, b) => a.PrepareTime - b.PrepareTime,

  },
  {
    title: 'CookTime',
    dataIndex: 'CookTime',
    key: 'CookTime',
    sorter: (a, b) => a.CookTime - b.CookTime,
  },
  {
    title: 'TotalTime',
    dataIndex: 'TotalTime',
    key: 'TotalTime',
    sorter: (a, b) => a.TotalTime - (b.TotalTime),
  },
  {
    title: 'AVGRating',
    dataIndex: 'AVGRating',
    key: 'AVGRating',
    sorter: (a, b) => a.AVGRating - b.AVGRating,
  },
];

// Define the maindish class with the constructor contain the state variable,
// Class component and functions.
class RecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      ingredient: '',
      totalTimeLow: '',
      totalTimeHigh: 100,
      ratingLow: 0,
      ratingHigh: 100,

      // Implement the search function for pastry id with the default one to be the
      // Banana snack cake recipe. Then define the pastry details and the reviews
      // And the list of the pastryresult
      selectedPastryId: window.location.search
        ? window.location.search.substring(1).split('=')[1] : 'Banana Snack Cake Recipe',
      selectedPastryDetails: null,
      selectedPastryReviews: null,
      pastryResults: [],
    };
    // Monitor URL Parameter changes.
    this.updateSearchResults = this.updateSearchResults.bind(this);
    this.handleRecipeNameChange = this.handleRecipeNameChange.bind(this);
    this.handleIngredientChange = this.handleIngredientChange.bind(this);
    this.handleTotalTimeChange = this.handleTotalTimeChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
  }

  // Called immediately after the component is mounted (inserted into the DOM tree).
  // The render() method is the only method that must be implemented in class components,
  // and other methods can be implemented according to their own needs.
  componentDidMount() {
    getPastrySearch(
      this.state.recipeName,
      this.state.ingredient,
      this.state.totalTimeLow,
      this.state.totalTimeHigh,
      this.state.ratingLow,
      this.state.ratingHigh,
      null,
      null,
    ).then((res) => {
      const validResults = res.results.filter((recipe) => recipe.RecipeName !== undefined);
      this.setState({ pastryResults: validResults });
    })
      .catch((error) => {
        console.error('An error occurred while fetching pastries:', error);
      });
    getPastry(this.state.selectedPastryId).then((res) => {
      // Check if the result is valid before setting the state.
      if (res.results[0] && res.results[0].RecipeName) {
        this.setState({ selectedPastryDetails: res.results[0] });
      } else {
        console.log('Invalid pastry data:', res.results[0]);
      }
    })
      .catch((error) => {
        console.error('An error occurred while fetching the pastry:', error);
      });
    getReview(this.state.selectedPastryId).then((res) => {
      this.setState({ selectedPastryReviews: res.results });
    });
  }

  handleRecipeNameChange(event) {
    this.setState({ recipeName: event.target.value });
  }

  handleIngredientChange(event) {
    this.setState({ ingredient: event.target.value });
  }

  // Handle the total time change with two real value representing
  // With the value[0] and value[1] correspondingly.
  handleTotalTimeChange(value) {
    this.setState({ totalTimeLow: value[0] });
    this.setState({ totalTimeHigh: value[1] });
  }

  handleRatingChange(value) {
    this.setState({ ratingLow: value[0] });
    this.setState({ ratingHigh: value[1] });
  }

  updateSearchResults() {
    getPastrySearch(
      this.state.recipeName,
      this.state.ingredient,
      this.state.totalTimeLow,
      this.state.totalTimeHigh,
      this.state.ratingLow,
      this.state.ratingHigh,
      null,
      null,
    ).then((res) => {
      this.setState({ pastryResults: res.results });
    });
  }

  render() {
    return (
      <div>
        {/* Create two search buttons for inputs for the recipe recommendation,
        using the elements and style
        we followed in the above two columns. Use the onChange method (handleClubQueryChange)  */}
        <MenuBar />
        <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
          <Row>
            <Col flex={2}>
              <FormGroup style={{ width: '30vw', margin: '0 auto' }}>
                <label>Recipe Name</label>
                <FormInput placeholder="Recipe Name" value={this.state.recipeName} onChange={this.handleRecipeNameChange} />
              </FormGroup>

            </Col>
            <Col flex={2}>
              <FormGroup style={{ width: '30vw', margin: '0 auto' }}>
                <label>Ingredient</label>
                <FormInput placeholder="Ingredient" value={this.state.ingredient} onChange={this.handleIngredientChange} />
              </FormGroup>

            </Col>
          </Row>
          <br />
          <Row>
            {/* For rating, set the default value, step and the max define to be 5  */}
            <Col flex={2}>
              <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                <label>Rating</label>
                <Slider
                  range
                  defaultValue={[0, 5]}
                  step={0.1}
                  max={5}
                  onChange={this.handleRatingChange}
                />

              </FormGroup>

            </Col>
            <Col flex={2}>
              <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                <label>Total Time</label>
                <Slider
                  range
                  defaultValue={[30, 180]}
                  max={501}
                  onChange={this.handleTotalTimeChange}
                />

              </FormGroup>

            </Col>
            <Col flex={2}>
              <FormGroup style={{ width: '10vw' }}>
                <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
              </FormGroup>

            </Col>

          </Row>

        </Form>
        <Divider />
        <Table dataSource={this.state.pastryResults} columns={recipeColumns} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} />
        <Divider />
        {/* The select pastry dettails contains the author, total
        time, ingredient, estimated total time and instructions. */}
        {this.state.selectedPastryDetails ? (
          <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
            <Card style={{ width: '70vw', marginTop: '2vh' }}>
              <CardBody>
                <Row gutter="30" align="middle" justify="center">
                  <Col flex={2} style={{ textAlign: 'left' }}>
                    <h3>{this.state.selectedPastryDetails.RecipeName}</h3>
                  </Col>

                  <Col flex={2} style={{ textAlign: 'right' }}>
                    {/* The element defining which referrer is
                    sent when fetching the resource here is
                    defiend as the no-referrer */}
                    <img src={this.state.selectedPastryDetails.RecipePhoto} referrerPolicy="no-referrer" alt={null} style={{ height: '15vh' }} />
                  </Col>
                </Row>

                <Row gutter="30" align="middle" justify="left">
                  <Col>
                    <h5>
                      Author:
                      {' '}
                      {this.state.selectedPastryDetails.Author}
                    </h5>
                  </Col>
                  <Col>
                    <h5>
                      Estimated Total Time:
                      {' '}
                      {this.state.selectedPastryDetails.TotalTime}
                      {' '}
                      minutes
                    </h5>
                  </Col>
                </Row>
                <br />
                <Row gutter="30" align="middle" justify="left">
                  <h6>Ingredients:</h6>
                  {' '}
                  {this.state.selectedPastryDetails.Ingredients}
                </Row>
                <br />
                <Row gutter="30" align="middle" justify="left">
                  <h6>Instructions:</h6>
                  {' '}
                  {this.state.selectedPastryDetails.Directions}
                </Row>
              </CardBody>
            </Card>
          </div>
        ) : null}
        <Divider />
        {/* Here defines the selected pasrty reviews for the
        certian profile of ID and the element rate
        beside the user with the form n/max */}
        {this.state.selectedPastryReviews ? (
          <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
            {this.state.selectedPastryReviews.map((element) => (
              <div key={element.ProfileID + 2}>
                <Comment
                  key={element.ProfileID}
                  author={(
                    <a href={`/personReview?profileId=${element.ProfileID}`}>
                      USER
                      {' '}
                      {element.ProfileID}
                      {' '}
                      [Rate
                      {' '}
                      {element.Rate}
                      /5]
                    </a>
                   )}
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                  content={(
                    <p>
                      {element.Comment}
                    </p>
                    )}
                />
                <Divider key={element.ProfileID + 1} />
              </div>
            ))}
          </div>
        ) : null}

      </div>
    );
  }
}

export default RecipePage;
