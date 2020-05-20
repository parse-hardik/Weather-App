import React, { Component } from 'react';
import { Switch, Link, Route, BrowserRouter as Router } from 'react-router-dom';
import './DashBoard.css';
import Weather from './Weather';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

var weatherapi = "dd33fff118b9f92aa2ae154e21f57789";

class Dashboard extends Component {

	constructor() {
		super();
		this.state = {
			city: "Delhi",
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
			icon: '',
			daily: [],
			img: '',
		}
		this.getPermission = this.getPermission.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.onImageSelect = this.onImageSelect.bind(this);
	}

	componentDidMount() {		
		Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${weatherapi}`)
			.then(res => {
				console.log(res.data);
				this.setState({ lat: res.data.coord.lat, lon: res.data.coord.lon });
				this.setState({ country: res.data.sys.country });
				var utc = res.data.dt + res.data.timezone;
				console.log('utc', utc);
				var time = new Date(utc * 1000);
				var utcString = time.toUTCString();
				var ti = utcString.slice(-12, -4);
				var hour = ti.slice(0, 2);
				var h = parseInt(hour, 10);
				console.log(h);
				this.setState({ time: h });
				this.setState({ temp: Math.floor(res.data.main.temp - 273.15) })
				this.setState({ desc: res.data.weather[0].description });
				this.setState({ hours: new Date().getHours() });
				this.setState({ min: new Date().getMinutes() });
				this.setState({ feel: Math.floor(res.data.main.feels_like - 273.15) });
				this.setState({ humid: res.data.main.humidity });
				this.setState({ pressure: res.data.main.pressure });
				this.setState({ visible: res.data.visibility / 1000 });
				this.setState({ wind: res.data.wind.speed });
				this.setState({ icon: res.data.weather[0].icon});
				this.onImageSelect();
			})
			.then(() => {
				Axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&appid=${weatherapi}`)
					.then((res)=>{
						console.log(res.data);
						this.setState({daily: res.data.daily});
					})

				console.log('hour is', this.state.time);
				if (this.state.time <= 11 && this.state.time >= 6) {
					document.getElementById('mybody').style.backgroundImage = "url('https://p1.pxfuel.com/preview/977/1000/868/spring-clouds-blue-sky-sky-blue.jpg')";
					document.getElementById('mybody').style.backgroundRepeat = "no-repeat";
					document.getElementById('mybody').style.backgroundSize = "cover";
					document.getElementById('new').style.color = "black";
					document.getElementById('mybody').classList.add('bgtransit');
				}
				if (this.state.time >= 12 && this.state.time <= 17) {
					document.getElementById('mybody').style.backgroundImage = "url('https://www.vmcdn.ca/f/files/moosejawtoday/images/weather/2019-03-09-weather-sunrise-mg.jpg;w=960')";
					document.getElementById('mybody').style.backgroundRepeat = "no-repeat";
					document.getElementById('mybody').style.backgroundSize = "cover";
					document.getElementById('new').style.color = "black";
					document.getElementById('mybody').classList.add('bgtransit');
				}
				if (this.state.time >= 18 || this.state.time <= 5) {
					document.getElementById('mybody').style.backgroundImage = "url('https://besthqwallpapers.com/img/original/26795/starry-sky-night-bright-stars-clouds.jpg')";
					document.getElementById('mybody').style.backgroundRepeat = "no-repeat";
					document.getElementById('mybody').style.backgroundSize = "cover";
					document.getElementById('new').style.color = "white";
					document.getElementById('mybody').classList.add('bgtransit');
				}
			})
	}

	onImageSelect=(event)=>{
		Axios({
			"method":"GET",
			"url":"https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI",
			"headers":{
			"content-type":"application/octet-stream",
			"x-rapidapi-host":"contextualwebsearch-websearch-v1.p.rapidapi.com",
			"x-rapidapi-key":"201016981cmsh1f2923302082e14p150ea4jsn808b948ad428",
			"useQueryString":true
			},"params":{
			"autoCorrect":"false",
			"pageNumber":"1",
			"pageSize":"10",
			"q":`${this.state.city}`,
			"safeSearch":"false"
			}
			})
			.then((res)=>{
				console.log(res.data)
				this.setState({img: res.data.value[0].url})
			})
			.catch((error)=>{
				console.log(error)
			})
	}

	error(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	success = (pos) => {
		var crd = pos.coords;

		console.log('Your current position is:');
		console.log(`Latitude : ${crd.latitude}`);
		console.log(`Longitude: ${crd.longitude}`);
		console.log(`More or less ${crd.accuracy} meters.`);
		Axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${weatherapi}`)
			.then((res) => {
				console.log('loc', res.data);
				this.setState({ country: res.data.sys.country });
				this.setState({ city: res.data.name });
				this.setState({ lat: res.data.coord.lat, lon: res.data.coord.lat });
				var utc = res.data.dt + res.data.timezone;
				console.log('utc', utc);
				var time = new Date(utc * 1000);
				var utcString = time.toUTCString();
				var ti = utcString.slice(-12, -4);
				var hour = ti.slice(0, 2);
				var h = parseInt(hour, 10);
				console.log(h);
				this.setState({ time: h });
				this.setState({ temp: Math.floor(res.data.main.temp - 273) });
				this.setState({ desc: res.data.weather[0].description });
				this.setState({ hours: new Date().getHours() });
				this.setState({ min: new Date().getMinutes() });
				this.setState({ feel: Math.floor(res.data.main.feels_like - 273.15) });
				this.setState({ humid: res.data.main.humidity });
				this.setState({ pressure: res.data.main.pressure });
				this.setState({ visible: res.data.visibility / 1000 });
				this.setState({ wind: res.data.wind.speed });
				this.setState({ icon: res.data.weather[0].icon});
				this.onImageSelect();
			})
			.then(() => {
				Axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${crd.latitude}&lon=${crd.longitude}&appid=${weatherapi}`)
					.then((res)=>{
						console.log(res.data);
						this.setState({daily: res.data.daily});
					})

				console.log('hour is', this.state.time);
				if (this.state.time <= 11 && this.state.time >= 6) {
					document.getElementById('mybody').style.backgroundImage = "url('https://p1.pxfuel.com/preview/977/1000/868/spring-clouds-blue-sky-sky-blue.jpg')";
					document.getElementById('mybody').style.backgroundRepeat = "no-repeat";
					document.getElementById('new').style.color = "black";
					document.getElementById('mybody').style.backgroundSize = "cover";
				}
				if (this.state.time >= 12 && this.state.time <= 17) {
					document.getElementById('mybody').style.backgroundImage = "url('https://www.vmcdn.ca/f/files/moosejawtoday/images/weather/2019-03-09-weather-sunrise-mg.jpg;w=960')";
					document.getElementById('mybody').style.backgroundRepeat = "no-repeat";
					document.getElementById('new').style.color = "black";
					document.getElementById('mybody').style.backgroundSize = "cover";
				}
				if (this.state.time >= 18 || this.state.time <= 5) {
					document.getElementById('mybody').style.backgroundImage = "url('https://besthqwallpapers.com/img/original/26795/starry-sky-night-bright-stars-clouds.jpg')";
					document.getElementById('mybody').style.backgroundRepeat = "no-repeat";
					document.getElementById('new').style.color = "white";
					document.getElementById('mybody').style.backgroundSize = "cover";
				}
			})
	}

	getPermission = (event) => {
		window.navigator.geolocation.getCurrentPosition(this.success, this.error);
	}

	onSearchChange = (event) => {
		if (event.keyCode === 13) {
			this.setState({ search: event.target.value });
			Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${event.target.value}&appid=${weatherapi}`)
				.then((res) => {
					console.log(res.data)
					this.setState({ lat: res.data.coord.lat, lon: res.data.coord.lon });
					this.setState({ city: res.data.name });
					this.setState({ country: res.data.sys.country });
					var utc = res.data.dt + res.data.timezone;
					console.log('utc', utc);
					var time = new Date(utc * 1000);
					var utcString = time.toUTCString();
					var ti = utcString.slice(-12, -4);
					var hour = ti.slice(0, 2);
					var h = parseInt(hour, 10);
					console.log(h);
					this.setState({ time: h });
					this.setState({ temp: Math.floor(res.data.main.temp - 273) });
					this.setState({ desc: res.data.weather[0].description });
					this.setState({ hours: new Date().getHours() });
					this.setState({ min: new Date().getMinutes() });
					this.setState({ feel: Math.floor(res.data.main.feels_like - 273.15) });
					this.setState({ humid: res.data.main.humidity });
					this.setState({ pressure: res.data.main.pressure });
					this.setState({ visible: res.data.visibility / 1000 });
					this.setState({ wind: res.data.wind.speed });
					this.setState({ icon: res.data.weather[0].icon});
					this.onImageSelect();
			})
				.then(() => {
					Axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&appid=${weatherapi}`)
					.then((res)=>{
						console.log(res.data);
						this.setState({daily: res.data.daily});
					})

					console.log('hour is', this.state.time);
					if (this.state.time <= 11 && this.state.time >= 6) {
						document.getElementById('mybody').style.backgroundImage = "url('https://p1.pxfuel.com/preview/977/1000/868/spring-clouds-blue-sky-sky-blue.jpg')";
						document.getElementById('mybody').style.backgroundRepeat = "no-repeat";
						document.getElementById('mybody').style.backgroundSize = "cover";
						document.getElementById('new').style.color = "black";
						document.getElementById('mybody').classList.add('bgtransit');
					}
					if (this.state.time >= 12 && this.state.time <= 17) {
						document.getElementById('mybody').style.backgroundImage = "url('https://www.vmcdn.ca/f/files/moosejawtoday/images/weather/2019-03-09-weather-sunrise-mg.jpg;w=960')";
						document.getElementById('mybody').style.backgroundRepeat = "no-repeat";
						document.getElementById('mybody').style.backgroundSize = "cover";
						document.getElementById('new').style.color = "black";
						document.getElementById('mybody').classList.add('bgtransit');
					}
					if (this.state.time >= 18 || this.state.time <= 5) {
						document.getElementById('mybody').style.backgroundImage = "url('https://besthqwallpapers.com/img/original/26795/starry-sky-night-bright-stars-clouds.jpg')";
						document.getElementById('mybody').style.backgroundRepeat = "no-repeat";
						document.getElementById('mybody').style.backgroundSize = "cover";
						document.getElementById('new').style.color = "white";
						document.getElementById('mybody').classList.add('bgtransit');
					}
				})
		}
	}

	render() {
		return (
			<Router>
				
				<div className="d-flex flex-column" id="new">
					<div className="d-flex ">
						<div className="d-flex flex-column mr-auto">
							<h1 id="" className="lt f2 yes b them ">Wearest</h1>
							<div className="d-flex ml-5" id="social-media">
								<a href={`https://twitter.com/intent/tweet?text=Current Weather in ${this.state.city} is ${this.state.temp}. For a live weather update, visit`} target="_blank">	   <FontAwesomeIcon icon={['fab', 'twitter']} className="social ok ml-5" /></a>
							</div>
						</div>
						
						<div className="d-flex flex-column m-3">
						<div className="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-1 mb-0">
							<i className="fas fa-search" aria-hidden="true"></i>
							<input onKeyDown={this.onSearchChange} className=" mt-2 f3 form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
								aria-label="Search" />
						</div>
							<div className="m-0">
								<a className="" onClick={this.getPermission}>Or use your current location</a>
							</div>
						</div>
					</div>

					<div id="" className="d-flex flex-column justify-content-center hey ">
						<div className="b f2">{this.state.city},{this.state.country}</div>
						<div className="d-flex center"><img src={`http://openweathermap.org/img/wn/${this.state.icon}@2x.png`} className="moon mr-2" /><div className="f1 sris">{this.state.temp}&#8451;</div></div>
						<div className="f2">{this.state.desc}<br></br>
							<h5 className="f4 mt-2">Updated as of {this.state.hours}:{this.state.min}</h5>
							<h5 className="f4 mt-2">Feels Like {this.state.feel}°   Wind {this.state.wind}km/h   Visiblity {this.state.visible}km</h5>
							<h5 className="f4 mt-2" >Pressure {this.state.pressure}mb Humidity {this.state.humid}%</h5>
						</div>
					</div>
					

				</div>
				<Weather daily={this.state.daily}/>



				<Switch>
					<Route path="/forecast" ></Route>
				</Switch>

			</Router>
		);
	}
}

export default Dashboard;