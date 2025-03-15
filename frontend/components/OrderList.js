import React from 'react'
import {useGetOrderQuery } from '../state/orderApi'
import { useDispatch, useSelector } from 'react-redux'
import { updateFilter } from '../state/orderSlice' 



export default function OrderList() {
  const orders = useGetOrderQuery().data || []
  const dispatch = useDispatch()
  const currentFilter = useSelector (st => st.filterState.size)


  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders.filter(order => {
            return currentFilter === 'All' || currentFilter === order.size

          }).map((order) => { 
            const {customer, size , toppings, id } = order
            return (
              <li key={id}>
                <div>
                {customer} ordered a size {size} with {toppings?.length|| 'no'} toppings
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === 'All' ? ' active' : ''}`
            return <button  onClick={() => dispatch(updateFilter(size))}
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>{size}</button>
           
          })
        
        }
      </div>
    </div>
  )
}
