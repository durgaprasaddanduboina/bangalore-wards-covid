import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import {formatDistance} from 'date-fns';
// import {
//   formatDate,
//   formatDateAbsolute,
//   validateCTS
// } from '../utils/common-functions';
import * as R from 'ramda';
/* import * as Icon from 'react-feather';
import {Link} from 'react-router-dom';*/

// import Table from './table';
// import Level from './level';
import MapExplorer from './mapexplorer';
// import TimeSeries from './timeseries';
// import Minigraph from './minigraph';
/* import Patients from './patients';*/

function Home(props) {
  const [states, setStates] = useState([]);
  const [stateDistrictWiseData, setStateDistrictWiseData] = useState({});
  /* const [patients, setPatients] = useState([]);*/
  const [fetched, setFetched] = useState(false);
  // const [graphOption, setGraphOption] = useState(1);
  // const [lastUpdated, setLastUpdated] = useState('');
  // const [timeseries, setTimeseries] = useState([]);
  // const [timeseriesMode, setTimeseriesMode] = useState(true);
  // const [timeseriesLogMode, setTimeseriesLogMode] = useState(false);
  const [regionHighlighted, setRegionHighlighted] = useState(undefined);

  useEffect(() => {
    if (fetched === false) {
      getStates();
    }
  }, [fetched]);

  const getStates = async () => {
    let dashboard_cred = { username: "bindu@rajasthan.com", password: "rEX@t09SrF", grant_type: "password" };
    let baseURL = "https://covid19.quantela.com/"
    let roomsListObj="";

    try {
      const [responseToken] = await Promise.all([
        
        axios.post(
          baseURL+"ds/1.0.0/public/token",
          JSON.stringify(dashboard_cred),
          {
            headers:{'Content-Type': 'application/json'}
          }
        )
        ]
        );
      const [response2] = await Promise.all([
        axios.post(
            baseURL + "abstraction/1.0.0/dashboard/getData/NFy5l3EBBJtV-SIHreyt",
            {},
            {
              headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + responseToken.data.access_token
              }
            }
        )
        ]
        );
      var newArr=[];
      response2.data.forEach((item)=>{
        if(!newArr.includes(item['DistrictName'])){
          newArr.push(item['DistrictName']);
        }
      });

      var myFinalArr=[];

      newArr.forEach((item1)=>{
        var recovered=0;
        var active=0;
        var death=0;
        response2.data.forEach((item2)=>{
          if(item1==item2['DistrictName']){
            recovered+=item2.Recovered ;
            active+=item2.Active;
            death+=item2.Death;
          }
        });
        myFinalArr.push({"Zone":item1,"count":{"Recovered":recovered,"Active":active,"Death":death}});
      });
      


      // const rmatt = [];
      // response.data.features.forEach((element) => {
      //   rmatt.push({...element.attributes});
      // });
      // const sortedFeature = rmatt.sort(
      //   (a, b) => b['Point_Count'] - a['Point_Count']
      // );

      // new API custom code
      /*
      R.map((x) => {
        x['Zone'] = x['Zone Name'];
      }, response.data);
      const groupByProductName = R.groupBy(R.prop('Zone'));
      
      const groupByOfferCode = R.groupBy(R.pathOr('_default', ['Status']));
      const countOfferCodes = R.map(R.length);
      const objToList = R.pipe(R.toPairs, R.map(R.zipObj(['Zone', 'count'])));

      const process = R.pipe(
        groupByProductName,
        R.map(R.pipe(groupByOfferCode, countOfferCodes)),
        objToList,
        R.sortBy(R.prop('Age group'))
      );

      const data = process(response.data);
      

      const data1 = R.map((x) => {
        if (
          x['Zone'] === '-' ||
          x['Zone'] === '' ||
          x['Zone'] === '#N/A' ||
          x['Zone'] === 'Outside Bangalore'
        ) {
          x['Zone'] = 'Non-resident';
        }
        const obj = {
          Zone: x['Zone'],
          Active: '',
          Recovered: '',
          Death: ''
        };
        obj.Active = x.count.Active || 0;
        obj.Recovered = x.count.Recovered || 0;
        obj.Death = x.count.Death || 0;
        return obj;
      }, data);

      const arr = [];
      R.map((x) => {
        const data4 = R.filter(R.propEq('Zone', 'Non-resident'))(data1);
        let ac = 0;
        let rec = 0;
        let death = 0;
        let zone = '';
        R.map((y) => {
          zone = y['Zone'];
          ac = ac + y.Active;
          rec = rec + y.Recovered;
          death = death + y.Death;
        }, data4);
        const obj = {
          Zone: zone,
          Active: ac,
          Recovered: rec,
          Death: death
        };

        const data5 = R.filter(R.propEq('Zone', 'Non-resident'))(arr);
        if (data5.length === 0) {
          arr.push(obj);
        }
        if (x['Zone'] !== 'Non-resident') {
          arr.push(x);
        }
      }, data1);

      const finalRes = [];
      
      R.map((x) => {
        if (x.Zone && x.Zone !== '') {
          finalRes.push({
            Point_Count: x.Active,
            ZONE: x.Zone,
            Recovered: x.Recovered,
            Death: x.Death
          });
        }
      }, arr);*/
      const endArr = [];
      R.map((x) => {
        if (x.Zone && x.Zone !== '') {
          endArr.push({
            Point_Count: x.count.Active,
            ZONE: x.Zone,
            Recovered: x.count.Recovered,
            Death: x.count.Death
          });
        }
      }, myFinalArr);

      setStates(endArr);
      // setTimeseries(validateCTS(response.data.cases_time_series));
      // setLastUpdated(response.data.statewise[0].lastupdatedtime);
      setStateDistrictWiseData(endArr);
      /* setPatients(rawDataResponse.data.raw_data.filter((p) => p.detectedstate));*/
      setFetched(true);
    } 
    catch (err) {
      console.log(err);
      const cannedRes = [
        {
          Point_Count: 3,
          ZONE: 'Mahadevapura',
          Recovered: 6,
          Death: 0
        },
        {
          Point_Count: 0,
          ZONE: 'RR Nagara',
          Recovered: 1,
          Death: 0
        },
        {
          Point_Count: 7,
          ZONE: 'East',
          Recovered: 9,
          Death: 0
        },
        {
          Point_Count: 8,
          ZONE: 'West',
          Recovered: 3,
          Death: 0
        },
        {
          Point_Count: 14,
          ZONE: 'South',
          Recovered: 5,
          Death: 0
        },
        {
          Point_Count: 2,
          ZONE: 'Bommanahalli',
          Recovered: 4,
          Death: 0
        },
        {
          Point_Count: 1,
          ZONE: 'Yelahanka',
          Recovered: 1,
          Death: 0
        },
        {
          Point_Count: 7,
          ZONE: 'Other District/State',
          Recovered: 1,
          Death: 1
        },
        {
          Point_Count: 1,
          ZONE: 'Rest of Bangalore Urban',
          Recovered: 2,
          Death: 0
        }
      ];
      setStates(cannedRes);
      setStateDistrictWiseData(cannedRes);
    }
  };

  // const onHighlightState = (state, index) => {
  //   if (!state && !index) setRegionHighlighted(null);
  //   else setRegionHighlighted({state, index});
  // };
  // const onHighlightDistrict = (district, state, index) => {
  //   if (!state && !index && !district) setRegionHighlighted(null);
  //   else setRegionHighlighted({district, state, index});
  // };

  return (
    <div className="Home">
      <div id="grid"></div>
      <div className="home-right">
        {fetched && (
          <React.Fragment>
            <MapExplorer
              states={states}
              stateDistrictWiseData={stateDistrictWiseData}
              regionHighlighted={regionHighlighted}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default Home;
