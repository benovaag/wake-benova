window.addEventListener("load", sortSetCurrent, false);

function sortSetCurrent() {
  const sortQueryStringValue = queryStringParams.get("ordenacao");
  if (sortQueryStringValue) {
    document.getElementById("sort_options").value = sortQueryStringValue;
  }
}

function sortResult(sortSetting) {
  queryStringParams.set("ordenacao", sortSetting);

  window.location.search = queryStringParams.toString();
}