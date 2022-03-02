import React from 'react'
import { useParams } from 'react-router-dom'

function OrderDetails() {
  const {id} = useParams()
  return (
    <div>OrderDetails {id}</div>
  )
}

export default OrderDetails