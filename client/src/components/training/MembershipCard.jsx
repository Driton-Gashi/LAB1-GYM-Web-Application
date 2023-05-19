import React from 'react'

export default function MembershipCard({time,price,desc,disc}) {
  return (
    <div className={`membership_card ${time === "Yearly" ? "yearly" : ""}` }>
      <div className={`${disc ? "savebadge" : ""}`}>{disc}</div>
      <div className='purchase_text'>
      <h4>{time}</h4>
      <p>Get started today</p>
      </div>
      <div className="price-container">
      <h6>$</h6>
      <h5>{price}</h5>
      </div>
      <div className={`purchase_text ${time === "Yearly" ? "blue_button" : ""}`}>
      <button>Purchase</button>
      <p>Billed every {desc}. Cancle anytime.</p>
      </div>
    </div>
  )
}

