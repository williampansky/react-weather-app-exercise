/**
 * Matches available icons to api code strings. This is required
 * considering there are a possible 38 different codes coming down
 * from the api—but we currently only have four icons available.
 *
 * @function getIcon
 * @param {Number} code Value from api.weather.code.
 */
export const getIcon = code => {
    const icons = {
        cloudDrizzle: 'cloud-drizzle-sun',
        cloudDrizzleSun: 'cloud-drizzle-sun',
        cloudLightning: 'cloud-lightning',
        cloudSun: 'cloud-sun'
    };

    const groups = {
        drizzle: [300, 301, 302],
        general: [800, 801, 802, 803, 804, 900],
        hazards: [700, 711, 721, 731, 741, 751],
        rain: [500, 501, 502, 511, 520, 521, 522],
        snow: [600, 601, 602, 610, 611, 612, 621, 622, 623],
        thunderstorms: [200, 201, 202, 230, 231, 232, 233]
    };

    if (groups.drizzle.includes(code)) return icons.cloudDrizzle;
    else if (groups.general.includes(code)) return icons.cloudSun;
    else if (groups.hazards.includes(code)) return icons.cloudSun;
    else if (groups.rain.includes(code)) return icons.cloudDrizzle;
    else if (groups.snow.includes(code)) return icons.cloudDrizzle;
    else if (groups.thunderstorms.includes(code)) return icons.cloudLightning;
    else return icons.cloudSun;
};
