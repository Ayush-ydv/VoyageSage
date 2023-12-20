import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ConversionComponent.css";

const ConversionComponent = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    const options = {
      method: "GET",
      url: "https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols",
      headers: {
        "X-RapidAPI-Key": "1ef47337d7msh89c104089ba955cp1b272djsn59bf3d530a98",
        "X-RapidAPI-Host":
          "currency-conversion-and-exchange-rates.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setCurrencies(Object.keys(response.data.symbols));
    } catch (error) {
      console.error(error);
    }
  };

  const handleConversion = async () => {
    const conversionOptions = {
      method: "GET",
      url: "https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert",
      params: {
        from: fromCurrency,
        to: toCurrency,
        amount: amount,
      },
      headers: {
        "X-RapidAPI-Key": "1ef47337d7msh89c104089ba955cp1b272djsn59bf3d530a98",
        "X-RapidAPI-Host":
          "currency-conversion-and-exchange-rates.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(conversionOptions);
      console.log("Conversion API response:", response);

      const convertedAmountValue = response.data.result;
      if (typeof convertedAmountValue !== "undefined") {
        setConvertedAmount(convertedAmountValue.toFixed(2));
        setShowModal(true);
      } else {
        console.error("Conversion result is undefined");
      }
    } catch (error) {
      console.error("Error fetching conversion:", error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setAmount("");
    setConvertedAmount("");
  };

  return (
    <div>
      {isVisible && (
        <div
          style={{
            position: "fixed",
            bottom: "60px",
            right: "50px",
            width: "300px",
            height: "400px",
            backgroundColor: "#3DAEFF",
            boxShadow: "0 0 10px rgba(0,0,0,0.25)",
            padding: "20px",
            overflowY: "scroll",
            borderRadius: "10px",
          }}
        >
          <h2
            style={
              {
                fontFamily: "Courier New, monospace",
                fontSize: "20px",
                marginLeft: "22px"
              }
            }
          >Currency Converter</h2>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="fromCurrency"
              style={{
                fontWeight: "bold",
                display: "block",
                marginBottom: "5px",
              }}
            >
              From:
            </label>
            <select
              id="fromCurrency"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">Select Currency</option>
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="toCurrency"
              style={{
                fontWeight: "bold",
                display: "block",
                marginBottom: "5px",
              }}
            >
              To:
            </label>
            <select
              id="toCurrency"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">Select Currency</option>
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="amount"
              style={{
                fontWeight: "bold",
                display: "block",
                marginBottom: "5px",
              }}
            >
              Amount:
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount to convert"
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ textAlign: "center" }}>
  <button
    onClick={handleConversion}
    style={{
      padding: "10px 20px",
      fontSize: "16px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#007bff",
      color: "#fff",
      cursor: "pointer",
    }}
  >
    Convert
  </button>
  {convertedAmount && (
    <div>
      <p>
        {amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}
      </p>
    </div>
  )}
</div>

         
        </div>
      )}
      <button
        style={{
          position: "fixed",
          bottom: "22px",
          right: "70px",
          zIndex: 1000,
          padding: "8px 16px",
          backgroundColor: "#3DAEFF",
          color: "#fff",
          border: "none",
          borderRadius: "100px",
          cursor: "pointer",
        }}
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "₹" : " ₹ "}
      </button>
    </div>
  );
};

export default ConversionComponent;
