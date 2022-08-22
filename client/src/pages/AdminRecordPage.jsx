import React from "react";
import AdminHeader from "../components/adminHeader/AdminHeader";
import RecordList from "../components/record-list/RecordList";

function AdminRecordPage() {
  return (
    <>
      <div className="row d-block d-md-flex">
        <div className="col-3 col-md-3">
          <AdminHeader />
        </div>
        <div className="col-9 col-md-9">
          <RecordList />
        </div>
      </div>
    </>
  );
}

export default AdminRecordPage;
