import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Card, CardBody, Col, Row, Button } from "reactstrap";
import { wss } from "../Config";
import { useLocation } from "react-router-dom";

const DataTable = ({ selectedCurrency }) => {
  const [currencyData, setCurrencyData] = useState([]);
  const [showError, setShowError] = useState(false);

  const location = useLocation();

  const connectWebSocket = () => {
    wss.onerror = (msg) => {
      if (msg.type === "error") {
        setShowError(true);
      }
    };

    let msg1 = JSON.stringify({
      event: "subscribe",
      channel: "ticker",
      symbol: `${
        location.pathname === "/" ? "tBTCUSD" : location.pathname.split("/")[1]
      }`,
    });

    wss.onopen = () => {
      wss.send(msg1);
    };

    wss.addEventListener("message", (msg) => {
      if (JSON.parse(msg.data).event == "subscribed") {
        wss.addEventListener("message", (msg1) => {
          if (JSON.parse(msg1.data)[1] != "hb") {
            setCurrencyData(JSON.parse(msg1.data)[1]);
          }
        });
      }
    });

    wss.onerror = (msg) => {
      if (msg.type === "error") {
        setShowError(true);
      }
    };
  };

  useEffect(() => {
    if (selectedCurrency != "") {
      connectWebSocket();
    }
  }, [selectedCurrency]);

  useEffect(() => {
    connectWebSocket();
  }, []);

  return (
    <div>
      <Card style={{ width: "20rem" }}>
        <CardBody>
          {currencyData.length == 0 ? (
            showError ? (
              <p>
                Some Error occur in the connection. Please try after sometime.
              </p>
            ) : (
              <p>No Data found. Please reconnect after some time.</p>
            )
          ) : (
            <Row>
              <Col>
                <div>
                  <p>
                    {location.pathname === "/"
                      ? String("tBTCUSD").substr(1, 3)
                      : String(location.pathname).substr(2, 3)}
                  </p>
                  <p>
                    Vol <span>{currencyData[7].toFixed(2)} </span>USD
                  </p>
                  <p>
                    Low <span>{currencyData[9].toFixed(0)}</span>
                  </p>
                </div>
              </Col>
              <Col>
                <div>
                  <p>{currencyData[6].toFixed(2)}</p>
                  <p>
                    <span
                      style={{
                        color: currencyData[4].toFixed(2).startsWith("-")
                          ? "red"
                          : "green",
                      }}
                    >
                      {currencyData[4].toFixed(2).split("-")[1]}
                    </span>
                    <span
                      style={{
                        color: (currencyData[5] * 100)
                          .toFixed(2)
                          .startsWith("-")
                          ? "red"
                          : "green",
                      }}
                    >
                      {" "}
                      ({(currencyData[5] * 100).toFixed(2).split("-")[1]}%)
                    </span>
                  </p>
                  <p>
                    High <span>{currencyData[8].toFixed(0)}</span>
                  </p>
                </div>
              </Col>
            </Row>
          )}
        </CardBody>
      </Card>
      <div style={{ marginLeft: "30px" }}>
        <Button color="primary" onClick={() => window.location.reload()}>
          Connect
        </Button>
        <Button
          color="danger"
          style={{ marginLeft: "20px" }}
          onClick={() => wss.close()}
        >
          Disconnect
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedCurrency: state.reducer.selectedCurrency,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
