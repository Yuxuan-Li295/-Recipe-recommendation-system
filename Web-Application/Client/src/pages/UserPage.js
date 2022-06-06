/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Form, FormInput, FormGroup, Button,
} from 'shards-react';
import {
  Row,
  Col,
  Table,
  Divider,
} from 'antd';

import MenuBar from '../components/MenuBarMainDish';
import {
  getUserReview, getUserFavIngredients, getUserRatingDistrbution, getUserSearch,
} from '../fetcher';
import '../assets/userpage.css';

const ReviewColumns = [
  {
    title: 'RecipeName',
    dataIndex: 'RecipeName',
    key: 'RecipeName',
    sorter: (a, b) => a.RecipeName.localeCompare(b.RecipeName),
    render: (text, row) => <a href={`/maindishes?name=${row.RecipeName}`}>{text}</a>,
  },
  {
    title: 'RecipeID',
    dataIndex: 'RecipeID',
    key: 'RecipeID',
    sorter: (a, b) => a.RecipeID - b.RecipeID,
  },
  {
    title: 'Rating',
    dataIndex: 'Rating',
    key: 'Rating',
    sorter: (a, b) => a.Rating - b.Rating,
  },
  {
    title: 'AVGRating',
    dataIndex: 'AVGRating',
    key: 'AVGRating',
    sorter: (a, b) => a.AVGRating - b.AVGRating,
  },
  {
    title: 'ReviewContent',
    dataIndex: 'ReviewContent',
    key: 'ReviewContent',
    sorter: (a, b) => a.ReviewContent.localeCompare(b.ReviewContent),
  },

];
// Construct the ingreident columns to show the ingredient name and count
// as the user's favorite ingredeints.
const IngredientsColumns = [
  {
    title: 'IngredientName',
    dataIndex: 'IngredientName',
    key: 'IngredientName',
    sorter: (a, b) => a.IngredientName.localeCompare(b.IngredientName),
  },
  {
    title: 'Count',
    dataIndex: 'Count',
    key: 'Count',
  },

];
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
    title: 'NumRating',
    dataIndex: 'NumRating',
    key: 'NumRating',
    sorter: (a, b) => a.NumRating - b.NumRating,
  },

];
// Construct a colunmn to show the user's rating distributions.
const DistributionColumns = [
  {
    title: 'Rating',
    dataIndex: 'Rating',
    key: 'Rating',
  },
  {
    title: 'Count',
    dataIndex: 'Count',
    key: 'Count',
  },

];

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      ReviewResults: [],
      IngredientsResults: [],
      DistributionResults: [],
      UsersResults: [],
      userId: window.location.search ? window.location.search.substring(1).split('=')[1] : '',
      // selectedUserDetails: null,
    };

    this.updateSearchResults = this.updateSearchResults.bind(this);
    this.handleUsernameQueryChange = this.handleUsernameQueryChange.bind(this);
  }

  componentDidMount() {
    getUserSearch(
      this.state.username,
    ).then((res) => {
      this.setState({ UsersResults: res.results });
    });
    getUserReview(
      this.state.userId,
    ).then((res) => {
      this.setState({ ReviewResults: res.results });
    });
    getUserFavIngredients(
      this.state.userId,
    ).then((res) => {
      this.setState({ IngredientsResults: res.results });
    });
    getUserRatingDistrbution(
      this.state.userId,
    ).then((res) => {
      this.setState({ DistributionResults: res.results });
    });
  }

  handleUsernameQueryChange(event) {
    // Update state variables appropriately. See handleNameQueryChange(event) for reference
    this.setState({ username: event.target.value });
  }

  updateSearchResults() {
    getUserSearch(
      this.state.username,
    ).then((res) => {
      this.setState({ UsersResults: res.results });
    });
    getUserReview(
      this.state.userId,
    ).then((res) => {
      this.setState({ ReviewResults: res.results });
    });
    getUserFavIngredients(
      this.state.userId,
    ).then((res) => {
      this.setState({ IngredientsResults: res.results });
    });
    getUserRatingDistrbution(
      this.state.userId,
    ).then((res) => {
      this.setState({ DistributionResults: res.results });
    });
  }

  render() {
    return (
      <div>
        <MenuBar />
        <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
          <Row>
            <Col flex={2}>
              {/* Define a menubar with the button to search a specific user
              with the user name.) */}
              <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                <label>Username</label>
                <FormInput placeholder="Name" value={this.state.username} onChange={this.handleUsernameQueryChange} />
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
        <Table style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} dataSource={this.state.UsersResults} columns={UserColumns} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} />
        <Divider />
        {this.state.userId
          ? (
            <div>
              <div className="segment">
                {/* display an external api response object that can fetch and display the
                corresponding userId. ) */}

                <h5>
                  Below is user activity information for ID:
                  {' '}
                  {this.state.userId}
                </h5>
              </div>
              <Divider />
              {/* For each below parts, create a separate segments with the page jumpers
               being enabled so that we can jump through different pages.
                */}
              <div className="segment"><h5>Review</h5></div>
              <Table style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} dataSource={this.state.ReviewResults} columns={ReviewColumns} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} />
              <Divider />
              <div className="segment"><h5>Favorite Ingredients</h5></div>
              <Table style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} dataSource={this.state.IngredientsResults} columns={IngredientsColumns} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} />
              <Divider />
              <div className="segment"><h5>Rating Distribution</h5></div>
              <Table style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} dataSource={this.state.DistributionResults} columns={DistributionColumns} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} />
              <Divider />
            </div>
          )
          : null}
      </div>
    );
  }
}

export default User;
