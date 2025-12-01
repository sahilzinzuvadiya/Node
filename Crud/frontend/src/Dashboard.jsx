// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Dashboard() {
//     const [users, setUsers] = useState([]);

//     const token = localStorage.getItem("token");

//     useEffect(() => {
//         getData();
//     }, []);

//     // Fetch users
//     const getData = async () => {
//         await axios.get("http://localhost:1006/auth/allUser", {
//             headers: { Authorization: `Bearer ${token}` }
//         }).then((res) => {
            
//             console.log("api",res.data);
//             console.log("api1",[res.data.data]);

//             setUsers([res.data.data]);
//         })


//     };

//     // Delete user
//     const handleDelete = async (id) => {
//         await axios.delete(`http://localhost:1006/auth/allUser/${id}`, {

//             headers: { Authorization: `Bearer ${token}` }
//         });
//         getData();
//     };

//     // Edit user
//     const handleEdit = async (id) => {
//         await axios.put(`http://localhost:1006/auth/allUser/${id}`, {

//             headers: {

//                 Authorization: `Bearer ${token}`
//             },

//         });
//         getData();
//     };



//     return (
//         <div className="p-5">
//             <h1 className="text-3xl font-bold">Dashboard</h1>

//             <button
//                 className="bg-red-500 text-white px-4 py-2 rounded mt-4"
//                 onClick={() => {
//                     localStorage.removeItem("token");
//                     window.location.href = "/";
//                 }}
//             >
//                 Logout
//             </button>

//             <div className="mt-5">
//                 {/* {users.map((u) => (
//                     <div key={u._id} className="border p-4 mb-2 rounded flex justify-between">
//                         <p>{u.name} — {u.email}</p>

//                         <div className="flex gap-3">
//                             <button onClick={() => handleEdit(u._id)} className="bg-yellow-400 px-3 py-1 rounded">Edit</button>
//                             <button onClick={() => handleDelete(u._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
//                         </div>
//                     </div>
//                 ))} */}
//                 {
//                     users.map((e, i) => {
//                         return (
//                             <ul key={i}>
//                                 <li>{e.name}</li>
//                                 <li>{e.email}</li>
//                                 <button onClick={() => handleDelete(e._id)}>Delete</button>
//                                 <button onClick={() => handleEdit(e._id)}>Edit</button>
//                             </ul>
//                         );
//                     })
//                 }

//             </div>
//         </div>
//     );
// }
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Dashboard() {

    const token = localStorage.getItem("token");

    const [record, setRecord] = useState([])

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = async () => {
        await axios.get("http://localhost:1006/auth/allUser", {
            headers : {
                Authorization :` Bearer ${token}`
            }
        }).then((res) => {
            setRecord(res.data.data)
            console.log(res.data.data)
        })
    }

  return (
    <div>
      <h1>Dashboard</h1>

      <table 
  className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-md" 
  width={"100%"} 
  border={1}
>
  <thead className="bg-indigo-600 text-white text-left">
    <tr>
      <th className="py-3 px-4">ID</th>
      <th className="py-3 px-4">Name</th>
      <th className="py-3 px-4">Email</th>
      <th className="py-3 px-4">Password</th>
      <th className="py-3 px-4">Time</th>
    </tr>
  </thead>

  <tbody className="bg-white">
    {record.map((e, i) => {
      return (
        <tr 
          key={i} 
          className="border-b hover:bg-indigo-50 transition"
        >
          <td className="py-2.5 px-4">{e._id}</td>
          <td className="py-2.5 px-4">{e.name}</td>
          <td className="py-2.5 px-4">{e.email}</td>
          <td className="py-2.5 px-4">{e.password}</td>
          <td className="py-2.5 px-4">{e.createdAt}</td>
        </tr>
      );
    })}
    {/* <tr>
    <td><p>{record._id}</p></td>
    <td><p>{record.name}</p></td>
    <td><p>{record.email}</p></td>
    <td><p>{record.password}</p></td>
    </tr> */}
  </tbody>
</table>


    </div>
  )
}