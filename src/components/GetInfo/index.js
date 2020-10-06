import React, { useEffect } from "react";
import { connect } from "react-redux";
import {getInfoFromAPI} from '../../redux/GetInfo'

function GetInfo(props) {
  useEffect(() => {
    async function getInfoFromAPI() {
      await props.getInfo();
    }
    getInfoFromAPI();

  }, []);

  return (
    <div>
      <h1>Welcom to the Test App</h1>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getInfo: () => dispatch(getInfoFromAPI())
})

export default connect(null, mapDispatchToProps)(GetInfo);
