// Dom elements capture.
const _2021 = document.getElementById("_2021");
const _2020 = document.getElementById("_2020");
const _2019 = document.getElementById("_2019");
const _2018 = document.getElementById("_2018");

function render_tables() {
  _2018_table();
  _2019_table();
  _2020_table();
  _2021_table();
}

render_tables();

function _2021_table() {
  let table_content = `
  <table class="table table-bordered table-sm table-striped">
    <thead class="thead-dark">
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>ID</th>
        <th>Description</th>
        <th>Comments</th>
        <th>Date</th>
        <th>Links</th>
      </tr>
    </thead>
    <tbody>
  `;

  for (let i = 0; i < registries_2021["Registries"].length; i++) {
    table_content += `
      <tr>
        <th scope="row">${registries_2021["Registries"].length - i}</th>
        <td>${registries_2021["Registries"][i].Name}</td>
        <td>${registries_2021["Registries"][i].ID}</td>
        <td>${registries_2021["Registries"][i].Description}</td>
        <td>${registries_2021["Registries"][i].Comments}</td>
        <td>${registries_2021["Registries"][i].Date}</td>
        <td>${ExtractLinksForTable(registries_2021["Registries"][i])}</td>
      </tr>
    `;
  }

  table_content += `
    </tbody>
  </table>
  `;

  _2021.innerHTML = table_content;
}

function _2020_table() {
  let table_content = `
  <table class="table table-bordered table-sm table-striped">
    <thead class="thead-dark">
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>ID</th>
        <th>Description</th>
        <th>Comments</th>
        <th>Date</th>
        <th>Links</th>
      </tr>
    </thead>
    <tbody>
  `;

  for (let i = 0; i < registries_2020["Registries"].length; i++) {
    table_content += `
      <tr>
        <th scope="row">${registries_2020["Registries"].length - i}</th>
        <td>${registries_2020["Registries"][i].Name}</td>
        <td>${registries_2020["Registries"][i].ID}</td>
        <td>${registries_2020["Registries"][i].Description}</td>
        <td>${registries_2020["Registries"][i].Comments}</td>
        <td>${registries_2020["Registries"][i].Date}</td>
        <td>${ExtractLinksForTable(registries_2020["Registries"][i])}</td>
      </tr>
    `;
  }

  table_content += `
    </tbody>
  </table>
  `;

  _2020.innerHTML = table_content;
}

function _2019_table() {
  let table_content = `
  <table class="table table-bordered table-sm table-striped">
    <thead class="thead-dark">
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>ID</th>
        <th>Description</th>
        <th>Comments</th>
        <th>Date</th>
        <th>Links</th>
      </tr>
    </thead>
    <tbody>
  `;

  for (let i = 0; i < registries_2019["Registries"].length; i++) {
    table_content += `
      <tr>
        <th scope="row">${registries_2019["Registries"].length - i}</th>
        <td>${registries_2019["Registries"][i].Name}</td>
        <td>${registries_2019["Registries"][i].ID}</td>
        <td>${registries_2019["Registries"][i].Description}</td>
        <td>${registries_2019["Registries"][i].Comments}</td>
        <td>${registries_2019["Registries"][i].Date}</td>
        <td>${ExtractLinksForTable(registries_2019["Registries"][i])}</td>
      </tr>
    `;
  }

  table_content += `
    </tbody>
  </table>
  `;

  _2019.innerHTML = table_content;
}

function _2018_table() {
  let table_content = `
  <table class="table table-bordered table-sm table-striped">
    <thead class="thead-dark">
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>ID</th>
        <th>Description</th>
        <th>Comments</th>
        <th>Date</th>
        <th>Links</th>
      </tr>
    </thead>
    <tbody>
  `;

  for (let i = 0; i < registries_2018["Registries"].length; i++) {
    table_content += `
      <tr>
        <th scope="row">${registries_2018["Registries"].length - i}</th>
        <td>${registries_2018["Registries"][i].Name}</td>
        <td>${registries_2018["Registries"][i].ID}</td>
        <td>${registries_2018["Registries"][i].Description}</td>
        <td>${registries_2018["Registries"][i].Comments}</td>
        <td>${registries_2018["Registries"][i].Date}</td>
        <td>${ExtractLinksForTable(registries_2018["Registries"][i])}</td>
      </tr>
    `;
  }

  table_content += `
    </tbody>
  </table>
  `;

  _2018.innerHTML = table_content;
}

// Returns string for table with Key as clickable link 
// and link as route to redirect.
function ExtractLinksForTable(Links) {
  const LinkNames = Links["LinkName"];
  const LinkUrls = Links["LinkUrl"];

  let counter = LinkNames.length;
  let result = "";

  for (let i = 0; i < counter; i++) {
    result += `<a target="_blank" href="${LinkUrls[i]}">${LinkNames[i]}</a> `;
  }

  return result;
}
