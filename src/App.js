import './App.css';
import React, { useState } from 'react';
import User from './pages/User'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register'
import GroupCreate from './pages/GroupCreate'
import GroupUpdate from './pages/GroupUpdate'
import GroupList from './pages/GroupList'
import { getItem, setItem } from './helpers/utils'
import { defaultUsers, defaultGroup } from './helpers/constant'

function App() {
  const [user, setUser] = useState(getItem('user') || {});
  const [users, setUsers] = useState(getItem('users') || defaultUsers);
  const [groups, setGroups] = useState(getItem('groups') || defaultGroup);
  const [no, setNo] = useState(getItem('no') || 2);
  const [applications, setApplications] = useState(getItem('applications') || []);

  // initialize the localStorage
  setItem('users', users)
  setItem('groups', groups)
  setItem('no', no)

  function login(user) {
    const obj = users.find(item => item.username === user.username)
    if (!obj || obj.password !== user.password) {
      return {
        code: 401,
        data: false,
        msg: 'Wrong username or password',
      }
    }
    setUser(user);
    return {
      code: 200,
      data: true,
      msg: ''
    }
  }

  function logout() {
    setUser(null);
  }

  function setUsersByProps(users) {
    setUsers(JSON.parse(JSON.stringify(users)))
    setItem('users', users)
  }

  function setNoByProps(no) {
    setNo(no)
    setItem('no', no)
  }

  function setGroupsByProps(groups) {
    setGroups(JSON.parse(JSON.stringify(groups)))
    setItem('groups', groups)
  }

  function setApplicationsByProps(applications) {
    setApplications(JSON.parse(JSON.stringify(applications)))
    setItem('applications', applications)
  }

  return (
    <Router>
      <header className="header">
        <section className="section-logo">
          <Link to="/">group finder</Link>
        </section>
        <section className="section-user">
          <User user={user} logout={logout} />
        </section>
      </header>

      <Switch>
        <Route path="/login">
          <Login login={login} />
        </Route>
        <Route path="/register">
          <Register users={users} setUsers={setUsersByProps} />
        </Route>
        <Route path="/group/create">
          <GroupCreate user={user} groups={groups} no={no} setGroups={setGroupsByProps} setNo={setNoByProps} />
        </Route>
        <Route path="/group/:no">
          <GroupUpdate user={user} groups={groups} applications={applications} setGroups={setGroupsByProps} setApplications={setApplicationsByProps} />
        </Route>
        <Route path="/">
          <GroupList user={user} groups={groups} applications={applications} setGroups={setGroupsByProps} setApplications={setApplicationsByProps} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
