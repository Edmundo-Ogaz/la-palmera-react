export function comunasAdapter(comunas) {
	if (!comunas)
		return [];

	return comunas.map((comuna, index) =>
		({
			id: index,
			code: comuna.codigo,
			name: comuna.nombre,
			codeCity: comuna.codigoCiudad,
			
		})
	);
}

export function comunaAdapter(comuna) {
	if (!comuna)
		return {};

	return {
		code: comuna.codigo,
		name: comuna.nombre,
		codeCity: comuna.codigoCiudad,
	}
}

export function comunaAdapterToApi(comuna) {
	if (!comuna)
		return {};

	return {
		codigo: comuna.code,
		nombre: comuna.name,
		codigoCiudad: comuna.codeCity,
	}
}