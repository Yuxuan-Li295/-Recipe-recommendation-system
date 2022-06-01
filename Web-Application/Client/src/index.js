import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import MainDishes from './pages/MainDishPage';
import Pastry from './pages/PastryPage';
import User from './pages/UserPage';
import PersonReviewPage from './pages/ProfilePage';
import NutritionCompare from './pages/NutritionComparePage';
import 'antd/dist/antd.min.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'shards-ui/dist/css/shards.min.css';
import Review from './pages/ReviewPage';
import Recommendation from './pages/RecommendationPage';

ReactDOM.render(
  <div>
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={<Login />}
        />
        <Route
          exact
          path="/homepage"
          element={<HomePage />}
        />
        <Route
          exact
          path="/maindishes"
          element={<MainDishes />}
        />
        <Route
          exact
          path="/pastry"
          element={<Pastry />}
        />
        <Route
          path="/user"
          element={<User />}
        />
        <Route
          path="/review/*"
          element={<Review />}
        />
        <Route
          path="/recommendation"
          element={<Recommendation />}
        />
        <Route
          exact
          path="/personReview"
          element={<PersonReviewPage />}
        />
        <Route
          exact
          path="/compare"
          element={<NutritionCompare />}
        />
      </Routes>
    </Router>
  </div>,
  document.getElementById('root'),
);
