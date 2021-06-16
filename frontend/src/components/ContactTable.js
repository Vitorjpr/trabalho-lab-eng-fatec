import React from 'react';

class ContactTable extends React.Component {

  render() {
    const contactList = this.props.state.contactList;
    const displayList = [];
    for (let i = 0; i < contactList.length; i++) { 
      displayList.push(
          <tr>
              <td>{contactList[i].id}</td>
              <td>{contactList[i].name}</td>
              <td>{contactList[i].email}</td>
              <td>{contactList[i].phone}</td>
          </tr>
      );
    }
    return (
      <div>
        <h2>Contact Table</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {displayList}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ContactTable;