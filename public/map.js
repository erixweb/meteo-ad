// @ts-check

const infoBox = document.querySelector("#info-box")

const provinces = {
	Ordino: {
		latitude: 42.5562,
		longitude: 1.5332,
	},
	Encamp: {
		latitude: 42.5347,
		longitude: 1.5801,
	},
	Canillo: {
		latitude: 42.5676,
		longitude: 1.5976,
	},
	"Escaldes-Engordany": {
		latitude: 42.5073,
		longitude: 1.5341,
	},
	"La Massana": {
		latitude: 42.545,
		longitude: 1.5148,
	},
	"Sant Julià de Lòria": {
		latitude: 42.4637,
		longitude: 1.4913,
	},
	"Andorra la Vella": {
		latitude: 42.5078,
		longitude: 1.5211,
	},
}

async function mapTemperature() {
	document.querySelectorAll("path").forEach(async (element) => {
		const province = element.getAttribute("title")

		const req = await fetch(
			`https://api.open-meteo.com/v1/meteofrance?latitude=${provinces[province].latitude}&longitude=${provinces[province].latitude}&current=temperature_2m&hourly=temperature_2m`
		)
		const res = await req.json()
		const temperature = res.current.temperature_2m	
		if (temperature < -5) {
			element.style.fill = "url(#menyscinc_temp)"
		} else if (temperature >= -5 && temperature < 0) {
			element.style.fill = "url(#lesszero)"
		} else if (temperature >= 0 && temperature < 5) {
			element.style.fill = "url(#lessfive)"
		}
	})
}
async function mapWind() {
	document.querySelectorAll("path").forEach(async (element) => {
		const province = element.getAttribute("title")

		const req = await fetch(
			`https://api.open-meteo.com/v1/ecmwf?latitude=${provinces[province].latitude}&longitude=${provinces[province].longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,snowfall,weather_code,wind_speed_10m&forecast_days=5`
		)
		const res = await req.json()
		const wind = res.hourly.wind_speed_10m[0]
		console.log(province, wind)
		if (wind < 5) {
			element.style.fill = "#206de8"
		} else if (wind >= 5 && wind < 15) {
			element.style.fill = "#bd20e8"
		} else if (wind >= 15 && wind < 25) {
			element.style.fill = "#5ccf1f"
		} else if (wind >= 25 && wind < 35) {
			element.style.fill = "#e6252e"
		} else if (wind >= 35) {
			element.style.fill = "#e6252e"
		}
	})
}
async function mapPrecipitacion() {
	document.querySelectorAll("path").forEach(async (element) => {
		const province = element.getAttribute("title")

		const req = await fetch(
			`https://api.open-meteo.com/v1/ecmwf?latitude=${provinces[province].latitude}&longitude=${provinces[province].longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,snowfall,weather_code,wind_speed_10m&forecast_days=5`
		)
		const res = await req.json()
		const wind = res.hourly.precipitation[0]
		console.log(province, wind)
		if (wind < 5) {
			element.style.fill = "#206de8"
		} else if (wind >= 5 && wind < 15) {
			element.style.fill = "#bd20e8"
		} else if (wind >= 15 && wind < 25) {
			element.style.fill = "#5ccf1f"
		} else if (wind >= 25 && wind < 35) {
			element.style.fill = "#e6252e"
		} else if (wind >= 35) {
			element.style.fill = "#e6252e"
		}
	})
}
const url = new URL(window.location.href)

const veure = url.searchParams.get("veure")

if (veure === "temperatura" || !veure) {
	mapTemperature()
} else if (veure === "vent") {
    mapWind()
} else if (veure === "precipitacio") {
	mapPrecipitacion()
}
