import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import * as d3 from "d3";
import { FormattedMessage } from "react-intl";

const Dashboard = () => {
    let [eventosDisp, setEventosDisp] = useState(null);

    useEffect(() => {
      if (!navigator.onLine) {
        if (localStorage.getItem("eventos") === null) {
          setEventosDisp("Loading...");
        } else {
          setEventosDisp(JSON.parse(localStorage.getItem("eventos")));
        }
      } else {
        fetch("api/eventos/")
          .then((response) => response.json())
          .then((data) => {
            setEventosDisp(data);
            localStorage.setItem("eventos", JSON.stringify(data));
          });
      }
    }, []);

    let [centrosDisp, setCentrosDisp] = useState(null);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("centrosTuristicos") === null) {
        setCentrosDisp("Loading...");
      } else {
        setCentrosDisp(JSON.parse(localStorage.getItem("centrosTuristicos")));
      }
    } else {
      fetch("api/centroturistico/")
        .then((response) => response.json())
        .then((data) => {
          setCentrosDisp(data);
          localStorage.setItem("centrosTuristicos", JSON.stringify(data));
        });
    }
  }, []);

  let [cardrestaurantesInfo, setRestaurantesInfo] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("restaurantes") === null) {
        setRestaurantesInfo("Loading...");
      } else {
        setRestaurantesInfo(JSON.parse(localStorage.getItem("restaurantes")));
      }
    } else {
      fetch("api/restaurante/")
        .then((response) => response.json())
        .then((data) => {
          setRestaurantesInfo(data);
          localStorage.setItem("restaurantes", JSON.stringify(data));
        });
    }
  }, []);

      // set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 90, left: 40},
width = 400 - margin.left - margin.right,
height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
d3.select("#my_dataviz").selectAll("svg").remove();
var svg = d3.select("#my_dataviz")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.json("api/eventos/").then (function(data) {

 // sort data
 data.sort(function(b, a) {
  return a.rate - b.rate;
}); 

// X axis
var x = d3.scaleBand()
.range([ 0, width ])
.domain(data.map(function(d) { return d.nombre; }))
.padding(0.2);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x))
.selectAll("text")
.attr("transform", "translate(-10,0)rotate(-45)")
.style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
.domain([0, 5])
.range([ height, 0]);
svg.append("g")
.call(d3.axisLeft(y));

// Bars
svg.selectAll("mybar")
.data(data)
.enter()
.append("rect")
.attr("x", function(d) { return x(d.nombre); })
.attr("width", x.bandwidth())
.attr("fill", "#69b3a2")
// no bar at the beginning thus:
.attr("height", function(d) { return height - y(0); }) // always equal to 0
.attr("y", function(d) { return y(0); })

// Animation
svg.selectAll("rect")
.transition()
.duration(800)
.attr("y", function(d) { return y(d.rate); })
.attr("height", function(d) { return height - y(d.rate); })
.delay(function(d,i){console.log(i) ; return(i*100)})

})

      // set the dimensions and margins of the graph
      var margin2 = {top: 10, right: 30, bottom: 90, left: 40},
      width2 = 400 - margin2.left - margin2.right,
      height2 = 450 - margin2.top - margin2.bottom;
      
      // append the svg object to the body of the page
      d3.select("#my_dataviz2").selectAll("svg").remove();
      var svg2 = d3.select("#my_dataviz2")
      .append("svg")
      .attr("width", width2 + margin2.left + margin2.right)
      .attr("height", height2 + margin2.top + margin2.bottom)
      .append("g")
      .attr("transform",
            "translate(" + margin2.left + "," + margin2.top + ")");
      
      // Parse the Data
      d3.json("api/centroturistico/").then (function(data) {
      
       // sort data
       data.sort(function(b, a) {
        return a.rate - b.rate;
      }); 
      
      // X axis
      var x = d3.scaleBand()
      .range([ 0, width2 ])
      .domain(data.map(function(d) { return d.nombre; }))
      .padding(0.2);
      svg2.append("g")
      .attr("transform", "translate(0," + height2 + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");
      
      // Add Y axis
      var y = d3.scaleLinear()
      .domain([0, 5])
      .range([ height2, 0]);
      svg2.append("g")
      .call(d3.axisLeft(y));
      
      // Bars
      svg2.selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function(d) { return x(d.nombre); })
      .attr("width", x.bandwidth())
      .attr("fill", "#69b3a2")
      // no bar at the beginning thus:
      .attr("height", function(d) { return height2 - y(0); }) // always equal to 0
      .attr("y", function(d) { return y(0); })
      
      // Animation
      svg2.selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", function(d) { return y(d.rate); })
      .attr("height", function(d) { return height2 - y(d.rate); })
      .delay(function(d,i){console.log(i) ; return(i*100)})
      
      })

            // set the dimensions and margins of the graph
var margin3 = {top: 10, right: 30, bottom: 90, left: 40},
width3 = 400 - margin3.left - margin3.right,
height3 = 450 - margin3.top - margin3.bottom;

// append the svg object to the body of the page
d3.select("#my_dataviz3").selectAll("svg").remove();
var svg3 = d3.select("#my_dataviz3")
.append("svg")
.attr("width", width3 + margin3.left + margin3.right)
.attr("height", height3 + margin3.top + margin3.bottom)
.append("g")
.attr("transform",
      "translate(" + margin3.left + "," + margin3.top + ")");

// Parse the Data
d3.json("api/restaurante/").then (function(data) {

 // sort data
 data.sort(function(b, a) {
  return a.rate - b.rate;
}); 

// X axis
var x = d3.scaleBand()
.range([ 0, width3 ])
.domain(data.map(function(d) { return d.nombre; }))
.padding(0.2);
svg3.append("g")
.attr("transform", "translate(0," + height3 + ")")
.call(d3.axisBottom(x))
.selectAll("text")
.attr("transform", "translate(-10,0)rotate(-45)")
.style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
.domain([0, 5])
.range([ height3, 0]);
svg3.append("g")
.call(d3.axisLeft(y));

// Bars
svg3.selectAll("mybar")
.data(data)
.enter()
.append("rect")
.attr("x", function(d) { return x(d.nombre); })
.attr("width", x.bandwidth())
.attr("fill", "#69b3a2")
// no bar at the beginning thus:
.attr("height", function(d) { return height3 - y(0); }) // always equal to 0
.attr("y", function(d) { return y(0); })

// Animation
svg3.selectAll("rect")
.transition()
.duration(800)
.attr("y", function(d) { return y(d.rate); })
.attr("height", function(d) { return height3 - y(d.rate); })
.delay(function(d,i){console.log(i) ; return(i*100)})

})

  return (
    <>
        {/* <div className='dashboard__graph__one'>
            <div className='square__graph__one col-sm-12'>
                <div className="dashboard__main__title">Nombre gráfica 1</div>
                <div id="my_dataviz"></div>
                <br />
            </div>
        </div> */}
        <div className='dashboard__graph'>
        <div className="dashboard__title">Dashboard</div>
            <div className='row justify-content-center'>
                <div className='square__graph__one col-md-4 ml-3 col-sm-12'>
                    <div className="dashboard__main__title"><FormattedMessage id="EventosGustados" /></div>
                    <br />
                    <div id="my_dataviz"></div>
                    <br />
                </div>
                <div className='square__graph__two col-md-3 col-sm-12'>
                    <div className="dashboard__main__title"><FormattedMessage id="CentrosGustados" /></div>
                    <br />
                    <div id="my_dataviz2"></div>
                    <br />
                </div>
                <div className='square__graph__three col-md-4 col-sm-12'>
                    <div className="dashboard__main__title"><FormattedMessage id="RestaurantesGustados" /></div>
                    <br />
                    <div id="my_dataviz3"></div>
                    <br />
                </div>
            </div>
        </div>
        <div className='stats'>
            <div className="dashboard__title"><FormattedMessage id="Estadisticas" /></div>
            <div className='row'>
                <div className='col-md-3 col-sm-12'>
                    <div className='square__stats__one'>
                    <img
                    loading="lazy"
                    className="dash__card__head__pic"
                    src="./img/dash-1.png"
                    alt="Service 3"
                     />
                    <div className="dashboard__main__title__card"><FormattedMessage id="CentrosTuristicos" /></div>
                    <div className="cat__card__body__text">
                      <FormattedMessage id="CentrosGustadosTxt" />
                     </div>
                    </div>
                </div>
                <div className='col-md-3 col-sm-12'>
                    <div className='square__stats__two'>
                    <img
                    loading="lazy"
                    className="dash__card__head__pic"
                    src="./img/dash-2.png"
                    alt="Service 3"
                     />
                    <div className="dashboard__main__title__card"><FormattedMessage id="Usuarios" /></div>
                    <div className="cat__card__body__text">
                      <FormattedMessage id="UsuariosTxt" />
                     </div>
                    </div>
                </div>
                <div className='col-md-3 col-sm-12'>
                    <div className='square__stats__three'>
                    <img
                    loading="lazy"
                    className="dash__card__head__pic"
                    src="./img/dash-3.png"
                    alt="Service 3"
                     />
                    <div className="dashboard__main__title__card"><FormattedMessage id="Restaurantes" /></div>
                    <div className="cat__card__body__text">
                      <FormattedMessage id="RestaurantesGustadosTxt" />
                     </div>
                    </div>
                </div>
                <div className='col-md-3 col-sm-12'>
                    <div className='square__stats__four'>
                    <img
                    loading="lazy"
                    className="dash__card__head__pic"
                    src="./img/dash-4.png"
                    alt="Service 3"
                     />
                    <div className="dashboard__main__title__card"><FormattedMessage id="Eventos" /></div>
                    <div className="cat__card__body__text">
                      <FormattedMessage id="EventosGustadosTxt" />
                     </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default Dashboard;
