/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Form, FormInput, FormGroup, Button,
} from 'shards-react';
import {
  Table,
  Divider,
  Row,
  Col,
} from 'antd';
// This page enable to recommend recipe by recipe or user or
// either to recommend user by user.
import MenuBar from '../components/MenuBarMainDish';
import {
  getRecipeRecommByRecipe,
  getRecipeRecommByUser,
  getUserRecommByUser,
} from '../fetcher';

import '../assets/recommandation.css';
// Create the recipe columns with the recipeID, name and the
// rate, and for teh reciepeID, create a hyperlink which links to the
// corresponding recipe reveiw page according to different recipename.
const RecipeColumns = [
  {
    title: 'RecipeID',
    dataIndex: 'RecipeID',
    key: 'RecipeID',
    sorter: (a, b) => a.RecipeID - b.RecipeID,
  },
  {
    title: 'RecipeName',
    dataIndex: 'RecipeName',
    key: 'RecipeName',
    sorter: (a, b) => a.RecipeName.localeCompare(b.RecipeName),
    render: (text, row) => <a href={`/maindishes?name=${row.RecipeName}`}>{text}</a>,
  },

  {
    title: 'RecommendRate',
    dataIndex: 'RecommendRate',
    key: 'RecommendRate',
    sorter: (a, b) => a.RecommendRate - b.RecommendRate,
  },
];
// Define the user columns with the user name and the userID
// Then define the corresponding recommend rate.
const UserColumns = [
  {
    title: 'Username',
    dataIndex: 'Username',
    key: 'Username',
    sorter: (a, b) => a.Username.localeCompare(b.Username),
  },
  {
    title: 'UserID',
    dataIndex: 'UserID',
    key: 'UserID',
    sorter: (a, b) => a.UserID - b.UserID,
    render: (text, row) => <a href={`/user?id=${row.UserID}`}>{text}</a>,
  },
  {
    title: 'RecommendRate',
    dataIndex: 'RecommendRate',
    key: 'RecommendRate',
    sorter: (a, b) => a.RecommendRate - b.RecommendRate,
  },

];
// Design the recommnedtion class with a method acttribute,
// The Idquery and the recipequery to store the corresponding
// recipe and the Id of the serach result, with a default
// recipe and userId being used.
class Recommendation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Idquery: '',
      Recipequery: '',
      method: 0,
      userResults: [],
      recipeResults: [],
      // userId: 424680,
      // RecipeId: 40893,
    };

    // this.updateSearchResults = this.updateSearchResults.bind(this);
    this.handleIdQueryChange = this.handleIdQueryChange.bind(this);
    this.handleRecipeQueryChange = this.handleRecipeQueryChange.bind(this);
    this.handleMethod1 = this.handleMethod1.bind(this);
    this.handleMethod2 = this.handleMethod2.bind(this);
    this.handleMethod3 = this.handleMethod3.bind(this);
  }

  handleIdQueryChange(event) {
    this.setState({ Idquery: event.target.value });
  }

  handleRecipeQueryChange(event) {
    this.setState({ Recipequery: event.target.value });
  }

  // Define three different haandle method to handle the
  // Change in the userresults and the reciperesults.
  handleMethod1() {
    this.setState({ method: 1 });
    getUserRecommByUser(
      this.state.Idquery,
    ).then((res) => {
      this.setState({ userResults: res.results });
    });
  }

  handleMethod2() {
    this.setState({ method: 2 });
    getRecipeRecommByUser(
      this.state.Idquery,
    ).then((res) => {
      this.setState({ recipeResults: res.results });
    });
  }

  handleMethod3() {
    this.setState({ method: 3 });
    getRecipeRecommByRecipe(
      this.state.Recipequery,
    ).then((res) => {
      this.setState({ recipeResults: res.results });
    });
  }

  // Define tables to either show the recipe results or the userresults
  // according to different serach of the user.
  // Switch the results according to the method value of the state.

  render() {
    let table;
    const { method } = this.state;
    if (method === 1) {
      table = <Table style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} dataSource={this.state.userResults} columns={UserColumns} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} />;
    } else {
      table = <Table style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} dataSource={this.state.recipeResults} columns={RecipeColumns} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} />;
    }
    return (
      <div>
        <MenuBar />

        {/*  attaching one selector to another selector, without use of whitespace
        here defines the tip class with the introduction of how to use the page.  */}
        <div className="recommandation-curtain">
          <div className="tip">
            We provide three ways of recommendation.
            {'\n'}
            1. given UserID, based on user behavior, recommend more similar users.
            {'\n'}
            2. given UserID, recommend more recipes which are similar to his favorite ones.
            {'\n'}
            3. given RecipeName, recommend more similar recipes.
          </div>
        </div>
        <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
          <Row>
            <Col flex={2} style={{ marginRight: '15%' }}>
              <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                <label>UserID</label>
                <FormInput placeholder="UserID" value={this.state.Idquery} onChange={this.handleIdQueryChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col flex={2} align="right" style={{ marginRight: '10%' }}>
              <Button style={{ marginTop: '4vh' }} onClick={this.handleMethod1}>Recommend similar users</Button>
            </Col>
          </Row>
          <Row>
            <Col flex={2} align="right" style={{ marginRight: '10%' }}>
              <Button style={{ marginTop: '4vh' }} onClick={this.handleMethod2}>Recommend suggested recipe</Button>
            </Col>
          </Row>
          <Row>
            <Col flex={2} style={{ marginRight: '15%' }}>
              <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                <label>RecipeID</label>
                <FormInput placeholder="UserID" value={this.state.Recipequery} onChange={this.handleRecipeQueryChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col flex={2} align="right" style={{ marginRight: '10%' }}>
              <Button style={{ marginTop: '4vh' }} onClick={this.handleMethod3}>Recommend similar recipe</Button>
            </Col>
          </Row>
        </Form>

        <Divider />
        <div>{table}</div>
        <Divider />
      </div>

    );
  }
}

export default Recommendation;
