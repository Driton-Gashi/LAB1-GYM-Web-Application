import { useState, useEffect, useRef } from "react";
import "../css/cart.css";
import CartItem from "../components/cart/CartItem";
const Cart = () => {
  const [items, setItems] = useState([]);
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [number3, setNumber3] = useState("");
  const [number4, setNumber4] = useState("");

  // const cardNumbers = document.querySelectorAll(".cardnumber input");
  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);
  const cardHolder = useRef(null);
  const isNumber = (x) => {
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return numbers.includes(x);
  };

  return (
    <div className="cartPage">
      <div id="wrapper">
        <div id="container">
          <div id="left-col">
            <div id="left-col-cont">
              <h2>Summary</h2>
              <CartItem
                image="http://emilcarlsson.se/assets/shirt.png"
                name="Blue Ocean Shirt"
                price={60}
              />
              <CartItem
                image="http://emilcarlsson.se/assets/green-shirt.png"
                name="Green Pine Shirt"
                price={55}
              />
              <CartItem
                image="http://emilcarlsson.se/assets/belt.png"
                name="Cow Skin Belt"
                price={32}
              />
              <CartItem
                image="http://emilcarlsson.se/assets/watch1.png"
                name="Festina Quartz Watch"
                price={299}
              />

              <p id="total">Total</p>
              <h4 id="total-price">
                <span>$</span> 446
              </h4>
            </div>
          </div>
          <div id="right-col">
            <h2>Payment</h2>
            <div id="logotype">
              <img
                id="mastercard"
                src="http://emilcarlsson.se/assets/MasterCard_Logo.png"
              />
            </div>

            <form>
              <label>Cardnumber</label>
              <div id="cardnumber">
                <input
                  ref={input1}
                  type="text"
                  maxLength="4"
                  value={number1}
                  onChange={(e) => {
                    if (
                      isNumber(e.nativeEvent.data) ||
                      e.nativeEvent.inputType == "deleteContentBackward"
                    ) {
                      setNumber1(e.target.value);
                      if (e.nativeEvent.inputType == "deleteContentBackward") {
                      } else {
                        if (number1.length == 3) {
                          input2.current.focus();
                        }
                      }
                    }
                  }}
                  placeholder="0123"
                />
                <span className="divider">-</span>
                <input
                  type="text"
                  ref={input2}
                  maxLength="4"
                  value={number2}
                  onChange={(e) => {
                    if (
                      isNumber(e.nativeEvent.data) ||
                      e.nativeEvent.inputType == "deleteContentBackward"
                    ) {
                      setNumber2(e.target.value);
                      if (e.nativeEvent.inputType == "deleteContentBackward") {
                      } else {
                        if (number2.length == 3) {
                          input3.current.focus();
                        }
                      }
                    }
                  }}
                  placeholder="4567"
                />
                <span className="divider">-</span>
                <input
                  ref={input3}
                  type="text"
                  maxLength="4"
                  value={number3}
                  onChange={(e) => {
                    if (
                      isNumber(e.nativeEvent.data) ||
                      e.nativeEvent.inputType == "deleteContentBackward"
                    ) {
                      setNumber3(e.target.value);
                      if (e.nativeEvent.inputType == "deleteContentBackward") {
                      } else {
                        if (number3.length == 3) {
                          input4.current.focus();
                        }
                      }
                    }
                  }}
                  placeholder="8901"
                />
                <span className="divider">-</span>
                <input
                  ref={input4}
                  type="text"
                  maxLength="4"
                  value={number4}
                  onChange={(e) => {
                    if (
                      isNumber(e.nativeEvent.data) ||
                      e.nativeEvent.inputType == "deleteContentBackward"
                    ) {
                      setNumber4(e.target.value);
                      if (e.nativeEvent.inputType == "deleteContentBackward") {
                      } else {
                        if (number4.length == 3) {
                          cardHolder.current.focus();
                        }
                      }
                    }
                  }}
                  placeholder="2345"
                />
              </div>

              <label>Cardholder</label>
              <input
                id="cardholder"
                ref={cardHolder}
                type="text"
                placeholder="John Doe"
                onChange={(e) => {
                  if (isNumber(e.nativeEvent.data)) {
                  }
                }}
              />
              <div className="left">
                <label>Expiration Date</label>
                <select name="month" id="month" size="1">
                  <option value="00">Month</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <select name="year" id="year" size="1">
                  <option value="00">Year</option>
                  <option value="01">2016</option>
                  <option value="02">2017</option>
                  <option value="03">2018</option>
                  <option value="04">2019</option>
                  <option value="05">2020</option>
                  <option value="06">2021</option>
                  <option value="07">2022</option>
                  <option value="08">2023</option>
                  <option value="09">2024</option>
                  <option value="10">2025</option>
                </select>
              </div>

              <div className="right">
                <label id="cvc-label">
                  CVC
                  <i className="fa fa-question-circle-o" aria-hidden="true"></i>
                </label>
                <input id="cvc" type="text" placeholder="123" maxLength="3" />
              </div>
              <button id="purchase">Purchase</button>
              <button id="paypal">
                <i className="fa fa-paypal" aria-hidden="true"></i> Pay with
                PayPal
              </button>
              <p id="support">
                Having problem with checkout?
                <a href="#">Contact our support</a>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
