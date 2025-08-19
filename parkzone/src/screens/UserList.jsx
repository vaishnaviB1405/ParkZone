import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getUsers , blockUnblockUsers } from "../services/user";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const response = await getUsers();
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users.");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const updateStatus = async (userId) => {
    try {
        const response = await blockUnblockUsers(userId);
        if (response.status === 200) {
            toast.success("User status updated successfully");
            loadUsers();
        } else {
            toast.error("Failed to update user status.");
        }
    } catch (error) {
        console.error("Error updating status:", error);
        toast.error("Failed to update user status.");
    }
};


  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Management</h2>

      {/* Customers Table */}
      <div className="mb-4">
        <h3>Customers</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter(user => user.role === "CUSTOMER")
              .map(user => (
                <tr key={user.userId}>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber || "N/A"}</td>
                  <td>
                    <button
                      className={`btn ${user.status ? "btn-danger" : "btn-success"}`}
                      onClick={() => updateStatus(user.userId, user.status)}
                    >
                      {user.status ? "Block" : "Unblock"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Employees Table */}
      <div>
        <h3>Employees</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter(user => user.role === "EMPLOYEE" && user.role !== "ADMIN") // Exclude Admins
              .map(user => (
                <tr key={user.userId}>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber || "N/A"}</td>
                  <td>
                    <button
                      className={`btn ${user.status ? "btn-danger" : "btn-success"}`}
                      onClick={() => updateStatus(user.userId, user.status)}
                    >
                      {user.status ? "Block" : "Unblock"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;

