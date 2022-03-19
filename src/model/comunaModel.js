class Comuna {

    constructor(code, name, cityCode) {
		this.code = code;
		this.name = name;
		this.cityCode = cityCode;
	}
}

export function comunasAdapter(comunas) {
	if (!comunas)
		return [];

	const adapted =  comunas.map(comuna =>
		new Comuna(
			comuna.codigo,
			comuna.nombre,
			comuna.codigociudad,
		)
	);
	return adapted;
}

export function comunaAdapter(comuna) {
	if (!comuna)
		return {};

	const adapted = new Comuna(
			comuna.codigo,
			comuna.nombre,
			comuna.codigociudad,
	)
	return adapted;
}