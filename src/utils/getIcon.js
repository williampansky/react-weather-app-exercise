/**
 * Matches available icons to api code strings. This is required
 * considering there are a possible 38 different codes coming down
 * from the api—but we currently only have four icons available.
 *
 * @function getIcon
 * @param {Number} code Value from api.weather.code
 * @version 0.1.7
 *
 * @since 0.1.7 - added debug mode
 * @since 0.1.6 - refactored icons & groups
 * @since 0.1.2 - Added cloud-default.svg
 *
 * @see [Codes]{@link https://www.weatherbit.io/api/codes}
 */
export const getIcon = code => {
    const icons = {
        cloud: 'cloud-sun',
        drizzle: 'cloud-drizzle',
        fog: 'fog',
        overcast: 'overcast-sun',
        rain: 'cloud-rain',
        snow: 'cloud-snow',
        storm: 'cloud-lightning',
        sun: 'sun',
        unknown: 'unknown'
    };

    const groups = {
        clear: [800],
        clouds: [801, 802, 803],
        drizzle: [300, 301, 302],
        hazards: [700, 711, 721, 731, 741, 751],
        overcast: [804],
        rain: [500, 501, 502, 511, 520, 521, 522],
        snow: [600, 601, 602, 610, 611, 612, 621, 622, 623],
        thunderstorms: [200, 201, 202, 230, 231, 232, 233]
    };

    /**
     * Target a specific icon to render for debugging purposes.
     */
    const debug = {
        enabled: false,
        icon: icons.sun
    };
    if (debug.enabled) return debug.icon;

    if (groups.clear.includes(code)) return icons.sun;
    else if (groups.clouds.includes(code)) return icons.cloud;
    else if (groups.drizzle.includes(code)) return icons.drizzle;
    else if (groups.hazards.includes(code)) return icons.fog;
    else if (groups.overcast.includes(code)) return icons.overcast;
    else if (groups.rain.includes(code)) return icons.rain;
    else if (groups.snow.includes(code)) return icons.snow;
    else if (groups.thunderstorms.includes(code)) return icons.storm;
    else return icons.unknown;
};

/**
 * Returns a randomized icon number.
 * @method getRandomIcon
 */
export const getRandomIcon = () => {
    const icons = [
        800,
        801,
        802,
        803,
        300,
        301,
        302,
        700,
        711,
        721,
        731,
        741,
        751,
        804,
        500,
        501,
        502,
        511,
        520,
        521,
        522,
        600,
        601,
        602,
        610,
        611,
        612,
        621,
        622,
        623,
        200,
        201,
        202,
        230,
        231,
        232,
        233
    ];

    let randomIcon = icons[Math.floor(Math.random() * icons.length)];
    return randomIcon;
};
