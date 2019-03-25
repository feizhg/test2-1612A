define(() => {
	return {
		getParam() {
			let param = location.search.slice(1);
			return JSON.parse('{"'+param.replace(/=/g, '":"').replace(/&/g, '","') + '"}');
		}
	}
});
