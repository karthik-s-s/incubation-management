import React from 'react'
import AdminHeader from '../components/adminHeader/AdminHeader'
import Booking from '../components/booking/Booking'

function BookingPage() {
  return (
    <div className="row d-block d-md-flex">
    <div className="col-3 col-md-3">
        <AdminHeader/>
        </div>
        <div className='col-9 col-md-9'>
        <Booking/>
        </div>
    </div>
  )
}

export default BookingPage