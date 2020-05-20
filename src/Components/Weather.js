import React from 'react';
import Card from './Card';
import Axios from 'axios';

const Weather = ( {daily} ) =>
{
	var date = new Date().getDate();
	const cardArray = daily.map((day,i) => {
		if(i!==0)
		{
			return (
				<Card 
					key={i}
					keys={i}
					max={Math.floor(daily[i].temp.max-237.15)} 
					min={Math.floor(daily[i].temp.min-273.15)} 
					desc={daily[i].weather[0].description} 
					icon={daily[i].weather[0].icon}
					date={(date+i>31)?(date+i-31):date+i}
					/>);
		}
	});
	return(
		<div>
			{cardArray}
		</div>
	);
}

export default Weather;