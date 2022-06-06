import React from 'react';

import {
  Row, Col, Button,
} from 'antd';
import '../assets/homepage.css';
// import MenuBar from '../components/MenuBar';
import mainDish from '../assets/img/maindish.jpg';
import pastry from '../assets/img/pastry.jpg';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.title = 'You are welcome to our food recommendation system';
  }

  render() {
    return (
      <div className="background">
        <div className="site-page-header">{this.title}</div>
        <Row gutter={[8, 16]}>
          <Col span={12}>
            <div>
              <div>
                <img className="img-css" src={pastry} alt="missing" width="100" />
              </div>
              <div className="curtain">
                <div className="text">
                  Welcome to our recipe recommendation system for pastry
                </div>
                <div className="button">
                  <Button type="primary" shape="round">
                    <a href="/pastry" alt="Broken Link"> Enter </a>
                  </Button>
                </div>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <div>
                <img className="img-css" src={mainDish} alt="missing" />
              </div>
              <div className="curtain">
                <div className="text">
                  Welcome to our recipe recommendation system for main dish
                </div>
                <div className="button">
                  <Button type="primary" shape="round">
                    <a href="/maindishes" alt="Broken Link"> Enter </a>
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default HomePage;
