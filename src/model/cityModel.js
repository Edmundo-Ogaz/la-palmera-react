export function citiesAdapter(cities) {
	if (!cities)
		return [];

	return cities.map((city, index) =>
		({
			id: index,
			code: city.codigo,
			name: city.nombre,
			codeRegion: city.codigoRegion,
			
		})
	);
}

export function cityAdapter(city) {
	if (!city)
		return {};

	return {
		code: city.codigo,
		name: city.nombre,
		codeCity: city.codigoRegion,
	}
}

export function cityAdapterToApi(city) {
	if (!city)
		return {};

	return {
		codigo: city.code,
		nombre: city.name,
		codigoCiudad: city.codeRegion,
	}
}