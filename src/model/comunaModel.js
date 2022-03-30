export function comunasAdapter(comunas) {
	if (!comunas)
		return [];

	return comunas.map((comuna, index) =>
		({
			id: index,
			code: comuna.codigo,
			name: comuna.nombre,
			codeCity: comuna.codigociudad,
			
		})
	);
}

export function comunaAdapter(comuna) {
	if (!comuna)
		return {};

	return {
		code: comuna.codigo,
		name: comuna.nombre,
		codeCity: comuna.codigociudad,
	}
}

export function comunaAdapterToApi(comuna) {
	if (!comuna)
		return {};

	return {
		code: comuna.code,
		name: comuna.name,
		cityCode: comuna.codeCity,
	}
}