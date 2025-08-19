import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../services/user";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserById(id);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (!user) return <h3 className="text-center">Loading user details...</h3>;

  return (
    <div className="container mt-4">
      <h2 className="text-center">User Details</h2>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>User ID</th>
            <td>{user.userId}</td>
          </tr>
          <tr>
            <th>First Name</th>
            <td>{user.firstName}</td>
          </tr>
          <tr>
            <th>Last Name</th>
            <td>{user.lastName}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{user.email}</td>
          </tr>
          <tr>
            <th>Birth Date</th>
            <td>{user.birthDate ? new Date(user.birthDate).toLocaleDateString() : "N/A"}</td>
          </tr>
          <tr>
            <th>Phone Number</th>
            <td>{user.phoneNumber || "N/A"}</td>
          </tr>
          <tr>
            <th>Role</th>
            <td>{user.role}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{user.status ? "Active" : "Inactive"}</td>
          </tr>
          {user.profileImagePath && (
            <tr>
              <th>Profile Image</th>
              <td>
                <img src={user.profileImagePath} alt="Profile" width="100" height="100" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
