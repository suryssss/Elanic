import React, { useState } from "react";

const UserManage = () => {
  const users = [
    {
        _id:123,
      name: "Rithwik",
      email: "rithwik@gmail.com",
      role: "admin",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", //Default
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    users.push(formData);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer", //Default
    });
  };

  const handleRoleChange = (userId, role) => {
    console.log({id:userId,role});

  };
  const handleDelete = (userId) => {
    if(window.confirm("Are you sure you want to delete this user?")){
        console.log(userId+" deleted");
    }

  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      <div className="p-6 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-6">Add User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded "
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded "
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded "
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded "
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 "
          >
            Add User
          </button>
        </form>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-4 px-6 text-left tracking-wide">Name</th>
              <th className="py-4 px-6 text-left tracking-wide">Email</th>
              <th className="py-4 px-6 text-left tracking-wide">Role</th>
              <th className="py-4 px-6 text-left tracking-wide">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="py-4 px-6 font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="py-4 px-6 text-gray-700">{user.email}</td>
                <td className="py-4 px-6 text-gray-700">
                    <select
                        value={user.role}
                        onChange={(e)=>handleRoleChange(user._id,e.target.value)}
                        className=" p-2 border rounded"
                    >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                </td>
                <td>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={()=>handleDelete(user._id)}>
                        Delete
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

export default UserManage;
