import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getInfoFromAPI, updateSortOrder } from "../../redux/GetInfo";
import "./index.css";

function GetInfo(props) {
  const loadingImage =
    "https://media.tenor.com/images/7d9cb36e95124fb829ff8f2450c3a567/tenor.gif";

  const { info } = props;

  useEffect(() => {
    async function getInfoOnComponentMount() {
      await props.getInfo();
    }
    getInfoOnComponentMount();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelect = (e) => {
    props.updateSortOrder(e.target.value);
    props.getInfo();
  };

  return (
    <div>
      <h1>Welcome to the Test App</h1>
      {!Object.keys(info).length ? (
        <div className="loading">
          <h3>Loading...</h3>
          <img src={loadingImage} alt="loading data" />
        </div>
      ) : (
        <div>
          <div className="sortby">
            <label>Sort By Name:</label>
            <select onChange={handleSelect}>
              <option value="inc" defaultChecked>
                Increasing
              </option>
              <option value="dec">Decreasing</option>
            </select>
          </div>
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
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  info: state.getInfo.info,
});

const mapDispatchToProps = (dispatch) => ({
  getInfo: () => dispatch(getInfoFromAPI()),
  updateSortOrder: (order) => dispatch(updateSortOrder(order)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GetInfo);
