const builds_content = document.getElementById('builds_content');

const builds = [
    {
        version: '1.4.0',
        url: 'https://dl.dropboxusercontent.com/s/0nwgr2kg09wbxin/Bit%20Frisbee%20v1.4.0.zip?dl=0'
    }
];

for (let i = 0; i < builds.length; i++) {
    builds_content.innerHTML += `
    <ul>
        <li>
            <a target="_blank" href="${builds[i].url}">Bit Frisbee v${builds[i].version}</a>
        </li>
    </ul>
    `;
}