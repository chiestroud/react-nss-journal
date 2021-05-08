import React from 'react';
import PropTypes from 'prop-types';

export default function Home({ user }) {
  return (
    <div className='main'>
      { user
        ? <div className='profileCard'>
          <header>Hello {user.fullName}</header>
          <img src={user.profileImage} className='profileImage' />
          <p>Welcome to my Journal Page</p>
        </div>
        : <h1>Please signin to view my journal page.</h1>
      }
    </div>
  );
}

Home.propTypes = {
  user: PropTypes.any
};
