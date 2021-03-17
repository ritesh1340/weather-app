const request = require ( "request" ) ; 

geocode = (address, callback) =>
{
	const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURI ( address ) + ".json?access_token=pk.eyJ1Ijoicml0ZXNoMTM0MCIsImEiOiJja2NzOWQwYXYxbTdvMnNsdXBmYWw5Y2Z3In0.vUcCIu9R0JYTAunqD0ibww" ; 

	request ( url , {json: true}, (error , response) =>
	{
		if ( error ) 
		{
			return callback ( "The geocode api is down" ) ; 
		}

		if ( response.body.features == undefined ) 
		{
			return callback ( "Geocode api wants you to enter a valid address" ) ; 	
		}

		if ( response.body.features.length == 0 ) 
		{
			return callback ( "Geocode api wants you to enter a valid address" ) ; 
		}

		const longitudeAndLatitude = 
		{
			longitude : response.body.features[0].center[0] , 
			latitude : response.body.features[0].center[1] , 
		}

		return callback ( undefined , longitudeAndLatitude ) ; 
	})
}

module.exports.geocode = geocode ; 