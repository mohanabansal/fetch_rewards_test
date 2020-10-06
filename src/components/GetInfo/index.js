import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getInfoFromAPI } from "../../redux/GetInfo";

function GetInfo(props) {
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
  );
}

const mapStateToProps = (state) => ({
  info: state.getInfo.info,
});

const mapDispatchToProps = (dispatch) => ({
  getInfo: () => dispatch(getInfoFromAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GetInfo);
