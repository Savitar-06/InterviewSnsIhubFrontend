import React, { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f0f2f5',
    height: '100vh',
  },
  backgrounddiv: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: '50px',
    borderRadius: '8px',
    boxShadow: '2px 6px 10px rgba(0, 0, 0, 0.6)',
    width: '600px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '50px',
    textAlign: 'center',
    color: '#333',
  },
  searchbox: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '600px',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    outline: 'none',
    borderBottom: '2px solid grey',
    width: '70%',
  },
  select: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    outline: 'none',
    borderBottom: '2px solid grey',
    width: '25%',
  },
  userlist: {
    listStyle: 'none',
    padding: 0,
    width: '100%',
    maxWidth: '600px',
  },
  useritem: {
    backgroundColor: '#fff',
    margin: '10px 0',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userdata: {
    fontSize: '16px',
    color: '#333',
  },
  roleBadge: {
    padding: '5px 10px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'capitalize',
  },
  roleUser: {
    backgroundColor: '#007bff',
  },
  roleAdmin: {
    backgroundColor: '#dc3545',
  },
  roleGuest: {
    backgroundColor: '#28a745',
  },
  noResults: {
    textAlign: 'center',
    color: '#888',
    marginTop: '20px',
    fontSize: '18px',
  },
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [roles, setroles] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        if(response?.data){
            setUsers(response.data);
        }
        const resp = await axios.get('http://localhost:5000/usersroles');
        if(resp.data){
            setroles(resp.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleFilter = (e) => {
    setRoleFilter(e.target.value);
  };

  const filteredUsers = users
    .filter(user => 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(user => roleFilter ? user.role.value === roleFilter : true);

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'Admin':
        return styles.roleAdmin;
      case 'Guest':
        return styles.roleGuest;
      default:
        return styles.roleUser;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgrounddiv}>
        <div style={styles.title}>User List</div>
        <div style={styles.searchbox}>
          <input
            type="text"
            placeholder="Search by name, email, or mobile number..."
            onChange={(e)=>handleSearch(e)}
            style={styles.input}
          />
          <select onChange={(e)=>handleRoleFilter(e)} style={styles.select}>
            <option value="" defaultChecked>All Roles</option>
            {roles?.map((v,i)=>{
                return <option key={i} value={v?.value}>{v?.value}</option>
            })}
          </select>
        </div>
        <ul style={styles.userlist}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <li key={index} style={styles.useritem}>
                <div style={styles.userdata}>
                  {user.firstName} {user.lastName} - {user.email} - {user.mobile}
                </div>
                <div style={{ ...styles.roleBadge, ...getRoleBadgeStyle(user?.role?.value) }}>
                  {user?.role?.value}
                </div>
              </li>
            ))
          ) : (
            <div style={styles.noResults}>No users found.</div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
