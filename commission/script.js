// ------------------------------------------------------------------------------------
// Commission status origin and div tag capture.
// ------------------------------------------------------------------------------------
const art_commission_status = document.getElementById("art_commission_status");
const software_commission_status_ = document.getElementById("software_commission_status_");

/**
 * Main.
 */
loadCommissionStatus();

// ------------------------------------------------------------------------------------
// HTML content rendering.
// ------------------------------------------------------------------------------------

/**
 * Art Commission content.
 */
const artCommissionOpen_content = `
    <div class="h3">
        Art Commission: <span style="color:green;">Open</span>
    </div>
    <p>
    At this moment I'm accepting art commissions.
    <br>
    Won't draw list included in the Commission form.
    <ul>
        <li><a target="_blank" href="../s/art-commission-contract">Terms of Service</a></li>
        <li><a target="_blank" href="../s/art-commission-form">Commission form</a></li>
    </ul>
    </p>
`;
const artCommissionClosed_content = `
    <div class="h3">
        Art Commissions: <span style="color:red;">Closed</span>
    </div>
    <p>
        At this moment <b>I am not accepting art commissions.</b>
        <br>
        However, you can still commission me <b>if you are willing to pay extras</b> by filling the commission form.
        <br><br>
        Won't draw list included in the Commission form.
        <ul>
        <li><a target="_blank" href="../s/art-commission-contract">Terms of Service</a></li>
        <li><a target="_blank" href="../s/art-commission-form">Commission form</a></li>
        </ul>
    </p>
`;

/**
 * Software Commission content.
 */
const softwareCommissionClosed_content = `
    <div class="h3">
        Software Commissions: <span style="color:red;">Closed</span>
    </div>
    <p>
    At this moment <b>I am not accepting software commissions.</b>
    <br>
    However, you can still commission me <b>if you are willing to pay extras</b> by filling the commission form.
    <ul>
        <li><a target="_blank" href="../s/software-commission-contract">Terms of Service</a></li>
        <li><a target="_blank" href="../s/software-commission-form">Commission form</a></li>
    </ul>
    </p>
`;
const softwareCommissionOpen_content = `
    <div class="h3">
        Software Commission: <span style="color:green;">Open</span>
    </div>
    <p>
        At this moment I'm accepting software commissions.
        <ul>
            <li><a target="_blank" href="../s/software-commission-contract">Terms of Service</a></li>
            <li><a target="_blank" href="../s/software-commission-form">Commission form</a></li>
        </ul>
    </p>
`;

// ------------------------------------------------------------------------------------
// Loads current commission status (both kinds of commission). Sets content depending of result.
// ------------------------------------------------------------------------------------
async function loadCommissionStatus() {
    let request = await fetch(SERVER_HOST + "/api/WebSiteSettings");
    let settings = await request.json();

    if (settings.ArtCommissionStatus)
        art_commission_status.innerHTML = artCommissionOpen_content;
    else
        art_commission_status.innerHTML = artCommissionClosed_content;

    if (settings.SoftwareCommissionStatus)
        software_commission_status_.innerHTML = softwareCommissionOpen_content;
    else
        software_commission_status_.innerHTML = softwareCommissionClosed_content;
}