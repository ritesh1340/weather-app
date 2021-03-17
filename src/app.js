const path = require('path'); 
const express = require('express')
const hbs = require ( 'hbs' ) 

const geocode = require ( "./utils/geocode" ) ; 
const weatherDetails = require ( "./utils/weather-stack" ) ; 

const app = express()
const port = 3000

const viewsPath = path.join( __dirname, '..', 'templates' , 'views' ) ; 
const staticDirectoryPath = path.join ( __dirname , '..' , 'public' ) ; 

console.log ( staticDirectoryPath ) ; 
 
app.use(express.static(staticDirectoryPath)); /// this is used, to serve up the static assets, like the css files
app.set('view engine', 'hbs'); 
app.set('views', viewsPath );

app.get ( '/' , (req , res) =>
{
	res.render ( "index" ) ; 
})

app.get('/weather', (req, res) => 
{
	const location = req.query.location ; 
	
	if ( location == undefined )
	{
		return res.render ( "404-page" , 
		{
			title : "404-page" , 
			name : "nakli Ritesh" , 
		})
	}

	geocode.geocode ( location , (error , {longitude, latitude} = {}) =>
	{		
		if ( error ) 
		{
			return res.render ( "error-page" , 
			{
				error : error , 
			})			
		}

		weatherDetails.weatherDetails ( longitude, latitude, (error , data) =>
		{
			if ( error ) 
			{
				return res.render ( "error-page" , 
				{
					error : error , 
				})
			}

			res.render ( "result" , 
			{
				title : "Weather-App" , 
				name : "nakli Ritesh" ,
				temperature : data.temperature , 
				apparentTemperature : data.apparentTemperature ,  
				location : location , 
			}) ; 				
		})
	})	
})

app.get ( "*" , ( req , res ) =>
{
	res.render ( "404-page" , 
	{
		title : "404 Page" , 
		name : "nakli Ritesh" ,		
	}) ; 
})

app.listen(port, () => {
	  console.log(`Example app listening at http://localhost:${port}`)
})