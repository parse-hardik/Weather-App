import React, { Component } from 'react';
import { Switch, Link, Route, BrowserRouter as Router } from 'react-router-dom';
import './DashBoard.css';
import Evening from './evening.jpg';
import Morning from './morning.jpg';
import Night from './night.jpeg';
import Axios from 'axios';

// const express = require('express');
// const cors = require('cors');

// var app = express();
// app.use(cors({origin: true, credentials: true}));

// process.env.PORT=5000;
// app.listen(process.env.PORT,()=>{
// 	console.log(`listening on port ${process.env.PORT}`);
// });

var weatherapi = "dd33fff118b9f92aa2ae154e21f57789";

class Dashboard extends Component {

	constructor(){
		super();
		this.state={
			city: "Salvador",
			lat: '',
			lon: '',
			time: '',
			search: 'Delhi',
			country: 'America',
			temp: '',
			desc: '',
			hours: '',
			min: '',
			feel: '',
			humid: '',
			pressure: '',
			visible: '',
			wind: '',
		}
		this.getPermission = this.getPermission.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
	}

	componentDidMount(){
		Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${weatherapi}`)
			.then(res =>{
				console.log(res.data);
				this.setState({lat: res.data.coord.lat,lon: res.data.coord.lat});
				this.setState({country: res.data.sys.country});
				var utc = res.data.dt + res.data.timezone;
				console.log('utc',utc);
				var time = new Date(utc*1000);
				var utcString = time.toUTCString(); 
				var ti = utcString.slice(-12, -4); 
				var hour = ti.slice(0,2);
				var h = parseInt(hour,10);
				console.log(h);
				this.setState({time: h});
				this.setState({temp: Math.floor(res.data.main.temp - 273.15)})
				this.setState({desc: res.data.weather[0].description});
				this.setState({hours: new Date().getHours()});
				this.setState({min: new Date().getMinutes()});
				this.setState({feel: Math.floor(res.data.main.feels_like-273.15)});
				this.setState({humid: res.data.main.humidity});
				this.setState({pressure: res.data.main.pressure});
				this.setState({visible: res.data.visibility/1000});
				this.setState({wind: res.data.wind.speed});
			})
			.then(()=>{
				console.log('hour is',this.state.time);
				if(this.state.time<=11)
				{
					document.getElementById('mybody').style.backgroundImage = "url('https://p1.pxfuel.com/preview/977/1000/868/spring-clouds-blue-sky-sky-blue.jpg')";
					document.getElementById('mybody').style.backgroundRepeat =  "no-repeat";
					document.getElementById('mybody').style.backgroundSize =  "cover";
					document.getElementById('mybody').classList.add('bgtransit');
				}
				if(this.state.time>=12 && this.state.time<=17)
				{
					document.getElementById('mybody').style.backgroundImage = "url('https://www.vmcdn.ca/f/files/moosejawtoday/images/weather/2019-03-09-weather-sunrise-mg.jpg;w=960')";
					document.getElementById('mybody').style.backgroundRepeat =  "no-repeat";
					document.getElementById('mybody').style.backgroundSize =  "cover";
					document.getElementById('mybody').classList.add('bgtransit');
				}
				if(this.state.time>=18)
				{
					document.getElementById('mybody').style.backgroundImage = "url('https://i.pinimg.com/originals/cd/fc/7c/cdfc7ca5d6de2933b51f1d525716f739.jpg')";
					document.getElementById('mybody').style.backgroundRepeat =  "no-repeat";
					document.getElementById('mybody').style.backgroundSize =  "cover";
					document.getElementById('mybody').classList.add('bgtransit');
				}
			})
	}

	error(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	success=(pos)=>{
		var crd = pos.coords;
	
		console.log('Your current position is:');
		console.log(`Latitude : ${crd.latitude}`);
		console.log(`Longitude: ${crd.longitude}`);
		console.log(`More or less ${crd.accuracy} meters.`);
		Axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${weatherapi}`)
			.then((res) =>{
				console.log('loc',res.data);
				this.setState({country: res.data.sys.country});
				this.setState({city: res.data.name});
				this.setState({lat: res.data.coord.lat,lon: res.data.coord.lat});
				var utc = res.data.dt + res.data.timezone;
				console.log('utc',utc);
				var time = new Date(utc*1000);
				var utcString = time.toUTCString(); 
				var ti = utcString.slice(-12, -4); 
				var hour = ti.slice(0,2);
				var h = parseInt(hour,10);
				console.log(h);
				this.setState({time: h});
				this.setState({temp: Math.floor(res.data.main.temp - 273)});
				this.setState({desc: res.data.weather[0].description});
				this.setState({hours: new Date().getHours()});
				this.setState({min: new Date().getMinutes()});
				this.setState({feel: Math.floor(res.data.main.feels_like-273.15)});
				this.setState({humid: res.data.main.humidity});
				this.setState({pressure: res.data.main.pressure});
				this.setState({visible: res.data.visibility/1000});
				this.setState({wind: res.data.wind.speed});
			})
			.then(()=>{
				console.log('hour is',this.state.time);
				if(this.state.time<=11)
				{
					document.getElementById('mybody').style.backgroundImage = "url('https://p1.pxfuel.com/preview/977/1000/868/spring-clouds-blue-sky-sky-blue.jpg')";
					document.getElementById('mybody').style.backgroundRepeat =  "no-repeat";
					document.getElementById('mybody').style.backgroundSize =  "cover";
				}
				if(this.state.time>=12 && this.state.time<=17)
				{
					document.getElementById('mybody').style.backgroundImage = "url('https://i.pinimg.com/originals/cd/fc/7c/cdfc7ca5d6de2933b51f1d525716f739.jpg')";
					document.getElementById('mybody').style.backgroundRepeat =  "no-repeat";
					document.getElementById('mybody').style.backgroundSize =  "cover";
				}
				if(this.state.time>=18)
				{
					document.getElementById('mybody').style.backgroundImage = "url('https://besthqwallpapers.com/img/original/26795/starry-sky-night-bright-stars-clouds.jpg')";
					document.getElementById('mybody').style.backgroundRepeat =  "no-repeat";
					document.getElementById('mybody').style.backgroundSize =  "cover";
				}
			})
	}

	getPermission=(event)=>{
		window.navigator.geolocation.getCurrentPosition(this.success,this.error);
	}
	
	onSearchChange=(event)=>{
		if(event.keyCode===13)
		{
			this.setState({search:event.target.value});
			Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${event.target.value}&appid=${weatherapi}`)
			.then((res)=>{
				console.log(res.data)
				this.setState({lat: res.data.coord.lat,lon: res.data.coord.lat});
				this.setState({city: res.data.name});
				this.setState({country: res.data.sys.country});
				var utc = res.data.dt + res.data.timezone;
				console.log('utc',utc);
				var time = new Date(utc*1000);
				var utcString = time.toUTCString(); 
				var ti = utcString.slice(-12, -4); 
				var hour = ti.slice(0,2);
				var h = parseInt(hour,10);
				console.log(h);
				this.setState({time: h});
				this.setState({temp: Math.floor(res.data.main.temp - 273)});
				this.setState({desc: res.data.weather[0].description});
				this.setState({hours: new Date().getHours()});
				this.setState({min: new Date().getMinutes()});
				this.setState({feel: Math.floor(res.data.main.feels_like-273.15)});
				this.setState({humid: res.data.main.humidity});
				this.setState({pressure: res.data.main.pressure});
				this.setState({visible: res.data.visibility/1000});
				this.setState({wind: res.data.wind.speed});
			})
			.then(()=>{
				console.log('hour is',this.state.time);
				if(this.state.time<=11)
				{
					document.getElementById('mybody').style.backgroundImage = "url('https://p1.pxfuel.com/preview/977/1000/868/spring-clouds-blue-sky-sky-blue.jpg')";
					document.getElementById('mybody').style.backgroundRepeat =  "no-repeat";
					document.getElementById('mybody').style.backgroundSize =  "cover";
					document.getElementById('mybody').classList.add('bgtransit');
				}
				if(this.state.time>=12 && this.state.time<=17)
				{
					document.getElementById('mybody').style.backgroundImage = "url('https://i.pinimg.com/originals/cd/fc/7c/cdfc7ca5d6de2933b51f1d525716f739.jpg')";
					document.getElementById('mybody').style.backgroundRepeat =  "no-repeat";
					document.getElementById('mybody').style.backgroundSize =  "cover";
					document.getElementById('mybody').classList.add('bgtransit');
				}
				if(this.state.time>=18)
				{
					document.getElementById('mybody').style.backgroundImage = "url('https://i.pinimg.com/originals/cd/fc/7c/cdfc7ca5d6de2933b51f1d525716f739.jpg')";
					document.getElementById('mybody').style.backgroundRepeat =  "no-repeat";
					document.getElementById('mybody').style.backgroundSize =  "cover";
					document.getElementById('mybody').classList.add('bgtransit');
				}
			})
		}
	}

	render(){
	return (
		<Router>
			<div className="sidenav">
					<Link to="/forecast">
					<span className="f3 mt2">hi</span>
					</Link>
				<br></br>
					<Link to="/history">
					<span className="f3">hi</span>
					</Link>
			</div>
			<div className="d-flex flex-column">
				<div className="d-flex ">
					<h1 className="lt f2 yes b them mr-auto"><span style={{color: "white"}}>Wearest</span></h1>
					<div className="d-flex flex-column m-3">
					<input 
						className = 'p-2 ba bg-lightest-blue tc'
						type = 'search' 
						placeholder = 'Search A Place' 
						onKeyDown={this.onSearchChange}
					/>
					<div className="mt-2">
						<button className="ba" onClick={this.getPermission}><span style={{color: "blue"}}>Or use your current location</span></button>
					</div>
					</div>
				</div> 
			
				<div className="d-flex flex-column justify-content-center ">
					<div className="b f2"><span style={{color: "white"}}>{this.state.city},{this.state.country}</span></div>
					<div className="d-flex center"><img src="https://www.stickpng.com/assets/images/580b57fcd9996e24bc43c399.png" className={""+ this.state.time>18?"moon mr-2":"hide"}/><div className="f1 sris"><span style={{color: "white"}}>{this.state.temp}&#8451;</span></div></div>
					<div className="f2"><span style={{color: "white"}}>{this.state.desc}</span><br></br>
						<div className="f4 b mt-2" style={{color: "white"}}>Updated as of {this.state.hours}:{this.state.min}</div>
						<div className="f4 b mt-2" style={{color: "white"}}>Feels Like {this.state.feel}°   Wind {this.state.wind}km/h   Visiblity {this.state.visible}km</div>
						<div className="f4 b mt-2" style={{color: "white"}}>Pressure {this.state.pressure}mb Humidity {this.state.humid}%</div>
					</div>
				</div>


			</div>
			
		  

			<Switch>
				<Route path="/forecast" ></Route>
			</Switch>

		</Router>	
	);
}
}

export default Dashboard;