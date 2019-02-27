/**
 * Matches available icons to api code strings. This is required
 * considering there are a possible 38 different codes coming down
 * from the api—but we currently only have four icons available.
 *
 * @function getIcon
 * @param {Number} code Value from api.weather.code
 * @version 0.1.2
 *
 * @since 0.1.2 - Added cloud-default.svg
 *
 * @see [Codes]{@link https://www.weatherbit.io/api/codes}
 */
export const getIcon = code => {
    const icons = {
        cloudDrizzle: 'cloud-drizzle',
        cloudDrizzleSun: 'cloud-drizzle-sun',
        cloudFog: 'cloud-fog',
        cloudLightning: 'cloud-lightning',
        cloudRain: 'cloud-rain',
        cloudSnow: 'cloud-snow',
        cloud: 'cloud',
        sun: 'sun'
    };

    const groups = {
        clouds: [803, 804],
        drizzle: [300, 301, 302],
        general: [801, 802, 900],
        hazards: [700, 711, 721, 731, 741, 751],
        rain: [500, 501, 502, 511, 520, 521, 522],
        snow: [600, 601, 602, 610, 611, 612, 621, 622, 623],
        sun: [800],
        thunderstorms: [200, 201, 202, 230, 231, 232, 233]
    };

    if (groups.clouds.includes(code)) return icons.cloud;
    else if (groups.drizzle.includes(code)) return icons.cloudDrizzle;
    else if (groups.general.includes(code)) return icons.cloud;
    else if (groups.hazards.includes(code)) return icons.cloudFog;
    else if (groups.rain.includes(code)) return icons.cloudRain;
    else if (groups.snow.includes(code)) return icons.cloudSnow;
    else if (groups.sun.includes(code)) return icons.sun;
    else if (groups.thunderstorms.includes(code)) return icons.cloudLightning;
    else return icons.cloud;
};
