import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/Auth';
import classes from './Navbar.module.scss';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const { verifyAuth } = useContext(AuthContext);

  const getUser = async () => {
    try {
      const { data } = await axios.get('https://todo-backend-es98.onrender.com/api/users/me');
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('https://todo-backend-es98.onrender.com/api/auth/logout');
      setUser(null);
      verifyAuth();
      toast.success('Logged out successfully');
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) return null;

  return (
    <header>
      <div className={classes.userInfo}>
        <FaUserAlt className={classes.userIcon} />
        <div>
          <h1 className={classes.name}>{user.name}</h1>
          <p className={classes.email}>{user.email}</p>
          <Link to="/edit-profile" className={classes.editBtn}>
            Edit
          </Link>
        </div>
      </div>
      <nav>
        <button type="button" className={classes.logout} onClick={handleLogout}>
          logout
        </button>
      </nav>
    </header>
  );
}
