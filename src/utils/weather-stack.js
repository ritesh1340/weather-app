const request = require ( "request" ) ; 

weatherDetails = (longitude, latitude, callback) =>
{	
	const url = "http://api.weatherstack.com/current?access_key=c33bf2f79f25ab186a4d92994c7a22af&query=" + latitude + "," + longitude ; 

	request ( url , {json: true} , (error , response) =>
	{
		if ( error ) 
		{
			return callback ( "The weatherstack api is down" ) ; 
		}

		if ( response.body.current == undefined ) 
		{
			return callback ( "The weatherstack api wants you, to enter a valid location" ) ; 			
		}

		const data = 
		{
			temperature: response.body.current.temperature, 
			apparentTemperature : response.body.current.feelslike, 
		}

		return callback ( undefined, data ) ; 
	})
}

module.exports.weatherDetails = weatherDetails ; 