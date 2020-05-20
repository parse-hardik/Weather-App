import React from 'react';

const Card =({ max,min,desc,icon,date,day,keys }) => {
	var dayname='Mon';
	var day = new Date().getDay();
	day = (day+keys)>=7?(day+keys-7):day+keys ;
	switch(day)
	{
		case 0: dayname="Sun";break;
		case 1: dayname="Mon";break;
		case 2: dayname="Tue";break;
		case 3: dayname="Wed";break;
		case 4: dayname="Thu";break;
		case 5: dayname="Fri";break;
		case 6: dayname="Sat";break;
	}
	return(
		<div className={`tc dib br3 pa3 ma2 grow bw2 shadow-5`}>
			<h2><span style={{color: "white"}}>{dayname} {date}</span></h2>
			<img alt = 'This a photu!' src = {`http://openweathermap.org/img/wn/${icon}@2x.png`} className="moon"/>
			<div>
				<a className="f2 m-2"><span style={{ color: "white" }}>{max}&#8451;</span></a><a className="f3 m-2"><span style={{ color: "white" }}>{min}&#8451;</span></a><br></br>
				<p><span style={{ color: "white" }}>{desc}</span></p>
			</div>
		</div>
	);
}

export default Card;