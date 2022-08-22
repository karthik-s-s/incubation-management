import React from 'react'
import AdminHome from '../components/admin-home/AdminHome'
import AdminHeader from '../components/adminHeader/AdminHeader'

function AdminHomePage() {
  return (
 <>
 <div className="row d-block d-md-flex">
<div className="col-3 col-md-3">
<AdminHeader/>

</div>
<div className="col-9 col-md-9">
<AdminHome/>
</div>


 </div>
    
 </>
  )
}

export default AdminHomePage