window.addEventListener("load", pageSizeSetCurrent, false);

function pageSizeSetCurrent() {
	const pageSizeQueryStringValue = queryStringParams?.get("tamanho")
	if (pageSizeQueryStringValue) {
		const pageSize = document.getElementById("page_size");
		let exists = false;

		for (i = 0; i < pageSize?.length; i++){
			if (pageSize.options[i].value.toString() == pageSizeQueryStringValue.toString()){
				exists = true;
			}
		}

		if (exists){
			pageSize.value = pageSizeQueryStringValue;
		}
	}
}

function setPageSize(qtde) {
	queryStringParams.set("tamanho", qtde);
	queryStringParams.delete("pagina");
	window.location.search = queryStringParams.toString();
}
