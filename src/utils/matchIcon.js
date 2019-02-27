/**
 * Integrating the full Climacons library from Adam Whitcroft.
 *
 * @function matchIcon
 *
 * @param {Number} code Value from api.weather.code
 * @returns {String} SVG filename string
 *
 * @version 0.1.0
 *
 * @see [Codes]{@link https://www.weatherbit.io/api/codes}
 * @see [Climacons]{@link http://adamwhitcroft.com/climacons}
 * @see [License]{@link media/climacons/LICENSE.md}
 */
export const matchIcon = code => {
    const filename = code.replace('.svg', '');
    return `climacons/${filename}`;
};
