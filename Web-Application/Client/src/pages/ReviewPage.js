/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Table,
  Divider,
} from 'antd';

import MenuBar from '../components/MenuBarMainDish';
import { getReviewMaindishes } from '../fetcher';

const playerColumns = [
  // define the title of the review page column
  // with the RecipeName, UserId, Rating and averageRating being processed
  // key is for react, and dataindex is for data accessing.
  {
    title: 'RecipeName',
    dataIndex: 'RecipeName',
    key: 'RecipeName',
    sorter: (a, b) => a.Name.localeCompare(b.RecipeName),
    render: (text, row) => <a href={`/maindishes?name=${row.RecipeName}`}>{text}</a>,
  },
  {
    title: 'UserID',
    dataIndex: 'UserID',
    key: 'UserID',
    sorter: (a, b) => a.UserID - b.UserID,
    render: (text, row) => <a href={`/user?id=${row.UserID}`}>{text}</a>,
  },
  {
    title: 'Username',
    dataIndex: 'Username',
    key: 'Username',
    sorter: (a, b) => a.Username.localeCompare(b.Username),
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
  },
  {
    title: 'ReviewContent',
    dataIndex: 'ReviewContent',
    key: 'ReviewContent',
    sorter: (a, b) => a.ReviewContent.localeCompare(b.ReviewContent),
  },

];

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameQuery: window.location.href.split('=')[1],
      ReviewResults: [],
    };

    this.updateSearchResults = this.updateSearchResults.bind(this);
  }

  componentDidMount() {
    getReviewMaindishes(
      this.state.nameQuery,
    ).then((res) => {
      this.setState({ ReviewResults: res.results });
    });
  }

  updateSearchResults() {
    getReviewMaindishes(
      this.state.nameQuery,
    ).then((res) => {
      this.setState({ ReviewResults: res.results });
    });
  }

  render() {
    return (

      <div>
        {/* Create the table for showing the review results for the detailed recipe */}
        <MenuBar />
        <Divider />
        <Table style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} dataSource={this.state.ReviewResults} columns={playerColumns} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} />
        <Divider />

      </div>
    );
  }
}

export default Review;
