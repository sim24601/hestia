import React, { useState, useEffect }  from "react";
import "../styles/Methode.css";
import qs from 'qs';
import store from "../store";
import GiteIcon from '@mui/icons-material/Gite';
import Button from '@mui/material/Button';
import axios from "axios";
const { api_url2 } = require("../settings");


function Methode() {
    const datadb = store.getState().commune.properties;
    const url = api_url2 + "/getprediction";
    const [dt, setDt] = useState('');
    const [estimation, setEstimation] = useState('');
    const [subscribe, setSubscribe] = useState(true);
    let input = datadb;

    async function estimate() {
        console.log('SUCCESS 0', input);
        await axios.get(url, {
                    params: {
                    bins: qs.stringify(input),
                  }
        })
        .then(function(response) {
            console.log('SUCCESS 1 :', response);
            if (response.status === 200) {
                let close = response;
                return close;
            }
        })
        .catch(function(error) {
            console.log('alerte générale', error)
            return error
        });
    };

    function lancement() {
        async function fetch() {
          let resultats = await estimate();
          console.log('success 2', resultats);
          if (subscribe) {
            setEstimation(resultats);
          }
          setSubscribe(false);
        }
        fetch();
    }

    return (
        <div className="methode-container">
             {datadb !== "" && (<p>bienvenue à {datadb.nom_commune}</p>)}
             {datadb !== "" && <Button variant="contained" style={{ backgroundColor: "#00cdb1", color: "black"}} startIcon={<GiteIcon />} onClick={() =>lancement()}>Estimation</Button>}
             {estimation !== "" && <p>prix estimé : {estimation}</p>}
        </div>
    )
}

export default Methode;

// import React from 'react';
// import "../styles/Methode.css";
// import { Container, Col, Row, Card } from 'react-bootstrap';
// import axios from 'axios';
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';
// import Plot from 'react-plotly.js';
// import { debounce } from 'lodash';

// class Methode extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//     };
//     this.onSliderChange = this.onSliderChange.bind(this);
//   }
//   async onSliderChange(input) {
//     await axios.get(`http://localhost:3002/hist-raw`,
//     {
//         params: {
//         bins: input,
//       }
//     }).then((data) => {
//       this.setState({
//         rawdata: [
//           {
//             y: data.data.map(x => x["counts"]),
//             x: data.data.map(x => x["mids"]),
//             type: 'bar'
//           }
//         ]
//       })
//     });
//   }
//   render() {
//     return (
//       <div className="methode-container">
//         <Container fluid>
//           <Row>
//             <Col md={3}>
//               <Card>
//                 <Card.Body>
//                   <Card.Title>Hello React!</Card.Title>
//                   <Card.Text>
//                     <label for="bins" class="col-form-label">
//                       Number of bins:
//                     </label>
//                     <Slider 
//                     id={"bins"} 
//                     onChange={debounce(this.onSliderChange, 60)} 
//                     min={1} 
//                     max={50} 
//                     marks={{
//                       1: '1',
//                       13: '13',
//                       26: '26',
//                       38: '38',
//                       50: '50'
//                     }} toolTipVisibleAlways={true} />
//                   </Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={8}>
//               <Plot
//                 data={this.state.rawdata}
//                 layout={{
//                   title: 'Histogram of waiting times',
//                   bargap: 0.01,
//                   autosize: true,
//                   xaxis: {
//                     title: 'Waiting time to next eruption (in mins)'
//                   },
//                   yaxis: {
//                     title: 'Frequency'
//                   },
//                   useResizeHandler: true,
//                   responsive: true
//                 }}
//               />
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     );
//   }
// }
// export default Methode;