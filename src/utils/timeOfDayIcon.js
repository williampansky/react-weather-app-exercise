/**
 * Takes in this.props.icon and returns
 * either day or night version.
 *
 * @function timeOfDayIcon
 * @param {String} icon this.props.icon
 * @param {String} time this.props.time
 * @returns {String}
 * @version 0.1.0
 */
export const timeOfDayIcon = (icon, time) => {
    switch (time) {
        case 'evening':
            return icon + '-moon';
        default:
            return icon + '-sun';
    }
};
