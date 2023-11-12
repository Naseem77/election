import React, { useEffect, useState } from "react";
import { useGetAllUsersMutation, useDeleteUserMutation } from "../../../slices/userApiSlice";
import { toast } from "react-toastify";

const Testing = () => {
  const [users, setUsers] = useState(null);
  const [getAllUsers, { isLoading }] = useGetAllUsersMutation();
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {}, [users]);

  const removeUser = async (item) => {
    try{
      let id = item._id
      const res = await deleteUser({id}).unwrap();
      window.location.reload(false);

    } catch (err){
      toast(err?.data?.message || err.error);
    }
  }

  const getUsers = async () => {
    try {
      const res = await getAllUsers().unwrap();
      setUsers(res);
    } catch (err) {
      toast(err?.data?.message || err.error);
    }
  };

  return (
    <div className="col-lg-12">
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    {item.rights === "2" ? (
                      <button type="button" className="btn btn-warning">
                        Admin
                      </button>
                    ) : (
                      <button type="button" className="btn btn-success">
                        Member
                      </button>
                    )}
                  </td>

                  <td>
                    {item.rights === "1" ? (
                      <button onClick={() => {removeUser(item)}} type="button" className="btn btn-outline-danger">
                        Delete
                      </button>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Testing;
