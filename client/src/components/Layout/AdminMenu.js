import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
    return (
        <>
            <div className="text-center">
                <div className="list-group">
                    <h4>Admin Panel</h4>
                    <NavLink
                        to="/dashboard/admin/add-semester"
                        className="list-group-item list-group-item-action"
                    >
                        Add Semester
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/add-book"
                        className="list-group-item list-group-item-action"
                    >
                        Add Book
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/books"
                        className="list-group-item list-group-item-action"
                    >
                        Books
                    </NavLink>
                    {/* <NavLink
                        to="/dashboard/admin/users"
                        className="list-group-item list-group-item-action"
                    >
                        Create Users
                    </NavLink> */}
                </div>
            </div>
        </>
    );
};

export default AdminMenu;
