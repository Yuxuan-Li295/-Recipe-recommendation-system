import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import 'antd/dist/antd.min.css';
import GithubCallback from './pages/GithubCallback';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import MainDishes from './pages/MainDishPage';
import NutritionCompare from './pages/NutritionComparePage';
import Pastry from './pages/PastryPage';
import PersonReviewPage from './pages/ProfilePage';
import User from './pages/UserPage';
import 'bootstrap/dist/css/bootstrap.css';
import 'shards-ui/dist/css/shards.min.css';
import Recommendation from './pages/RecommendationPage';
import Review from './pages/ReviewPage';

ReactDOM.render(
  <div>
    <Router>
      <Routes>
        <Route
          exact
          path="/auth/github/callback"
          element={<GithubCallback />}
        />
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
