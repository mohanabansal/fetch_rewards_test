import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getInfoFromAPI } from "../../redux/GetInfo";
import "./index.css";

function GetInfo(props) {
  const loadingImage =
    "https://media.tenor.com/images/7d9cb36e95124fb829ff8f2450c3a567/tenor.gif";

  useEffect(() => {
    async function getInfoFromAPI() {
      await props.getInfo();
    }
    getInfoFromAPI();
  }, []);

  const { info } = props;
  console.log("info", info);
  return (
    <div>
      <h1>Welcome to the Test App</h1>
      {!Object.keys(info).length ? (
        <div className = "loading">
          <h3>Loading...</h3>
          <img src={loadingImage} alt="loading data" />
        </div>
      ) : (
        <table>
          {Object.keys(info)
            .sort()
            .map((key) => {
              return (
                <tbody key={key}>
                  <tr>
                    <th>{key}</th>
                  </tr>
                  {info[key].map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              );
            })}
        </table>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  info: state.getInfo.info,
});

const mapDispatchToProps = (dispatch) => ({
  getInfo: () => dispatch(getInfoFromAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GetInfo);
