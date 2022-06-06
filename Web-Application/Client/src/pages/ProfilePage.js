/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Card, Row, Col, Comment, Avatar,
} from 'antd';
import { getPersonReview } from '../fetcher';
// Define the personal review page that coudl have the method to
// get the personalreview
class PersonReviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserId: window.location.search
        ? window.location.search.substring(1).split('=')[1] : '7932',
      selectedProfileDetails: null,
    };
  }

  componentDidMount() {
    getPersonReview(this.state.selectedUserId).then((res) => {
      this.setState({ selectedProfileDetails: res.results });
    });
  }

  render() {
    return (

      <div>
        {this.state.selectedProfileDetails
          ? (
            this.state.selectedProfileDetails.map((elem) => (
              <Card>
                <Row gutter="30" align="top" justify="center">
                  <Col flex={2} style={{ textAlign: 'left' }}>
                    <h3>{elem.RecipeName}</h3>
                  </Col>
                  <Col flex={2} style={{ textAlign: 'right' }}>
                    <img src={elem.RecipePhoto} referrerPolicy="no-referrer" alt={null} style={{ height: '15vh' }} />
                  </Col>
                </Row>
                <Row>
                  <Comment
                    key={elem.ProfileID}
                    author={(
                      <p>
                        USER
                        {' '}
                        {elem.ProfileID}
                        {' '}
                        [Rate
                        {' '}
                        {elem.Rate}
                        /5]
                      </p>
                    )}
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                    content={(
                      <p>
                        {elem.Comment}
                      </p>
                    )}
                  />
                </Row>
              </Card>
            ))
          )
          : (null)}
      </div>
    );
  }
}

export default PersonReviewPage;
