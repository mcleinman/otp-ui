import PropTypes from "prop-types";
import { ReactPropTypeLocationNames } from "react";
import { isValidLatLng } from "./map";

/**
 * Leaflet path properties to use to style a CircleMarker, Marker or Polyline.
 *
 * See https://leafletjs.com/reference-1.6.0.html#path
 */
export const leafletPathType = PropTypes.shape({
  bubblingMouseEvents: PropTypes.bool,
  color: PropTypes.string,
  className: PropTypes.string,
  dashArray: PropTypes.string,
  dashOffset: PropTypes.string,
  fill: PropTypes.bool,
  fillColor: PropTypes.string,
  fillOpacity: PropTypes.number,
  fillRule: PropTypes.string,
  lineCap: PropTypes.string,
  lineJoin: PropTypes.string,
  opacity: PropTypes.number,
  renderer: PropTypes.func,
  stroke: PropTypes.bool,
  weight: PropTypes.number
});

/**
 * Describes some options to help display data about a transit agency that is
 * configured in an opentripplanner instance.
 */
export const transitOperatorType = PropTypes.shape({
  defaultRouteColor: PropTypes.string,
  defaultRouteTextColor: PropTypes.string,
  id: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  longNameSplitter: PropTypes.string,
  name: PropTypes.string,
  order: PropTypes.number
});

export const languageConfigType = PropTypes.shape({
  stopViewer: PropTypes.string
});

/**
 * Represents the expected configuration of the webapp
 */
export const configType = PropTypes.shape({
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      /* a comma-separated string listing the modes that this company has */
      modes: PropTypes.string.isRequired
    }).isRequired
  ),
  dateTime: PropTypes.shape({
    timeFormat: PropTypes.string,
    dateFormat: PropTypes.string,
    longDateFormat: PropTypes.string
  }),
  transitOperators: PropTypes.arrayOf(transitOperatorType)
});

const feedScopedIdType = PropTypes.shape({
  agencyId: PropTypes.string,
  id: PropTypes.string
});

export const encodedPolylineType = PropTypes.shape({
  length: PropTypes.number.isRequired,
  points: PropTypes.string.isRequired
});

const elevationData = PropTypes.arrayOf(
  PropTypes.shape({
    first: PropTypes.number.isRequired,
    second: PropTypes.number.isRequired
  }).isRequired
);

const alertType = PropTypes.shape({
  alertHeaderText: PropTypes.string,
  alertDescriptionText: PropTypes.string,
  alertUrl: PropTypes.string,
  effectiveStartDate: PropTypes.number
});

/**
 * Represents steps in a leg in an itinerary of an OTP plan response. These are
 * only for non-transit modes.
 * See documentation here: http://otp-docs.ibi-transit.com/api/json_WalkStep.html
 */
export const stepsType = PropTypes.arrayOf(
  PropTypes.shape({
    absoluteDirection: PropTypes.string.isRequired,
    alerts: PropTypes.arrayOf(alertType),
    area: PropTypes.bool.isRequired,
    bogusName: PropTypes.bool.isRequired,
    distance: PropTypes.number.isRequired,
    elevation: elevationData.isRequired,
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
    relativeDirection: PropTypes.string.isRequired,
    stayOn: PropTypes.bool.isRequired,
    streetName: PropTypes.string.isRequired
  })
);

const placeType = PropTypes.shape({
  arrival: PropTypes.number,
  departure: PropTypes.number,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  networks: PropTypes.arrayOf(PropTypes.string.isRequired),
  stopCode: PropTypes.string,
  stopId: PropTypes.string,
  stopIndex: PropTypes.number,
  stopSequence: PropTypes.number,
  vertexType: PropTypes.string.isRequired,
  zoneId: PropTypes.string
});

/**
 * Represents a leg in an itinerary of an OTP plan response. Each leg represents
 * a portion of the overall itinerary that is done until either reaching the
 * destination or transitioning to another mode of travel. See OTP webservice
 * documentation here:
 * http://otp-docs.ibi-transit.com/api/json_Leg.html
 */
export const legType = PropTypes.shape({
  agencyId: PropTypes.string,
  agencyName: PropTypes.string,
  agencyTimeZoneOffset: PropTypes.number.isRequired,
  agencyUrl: PropTypes.string,
  alerts: PropTypes.arrayOf(alertType),
  arrivalDelay: PropTypes.number.isRequired,
  departureDelay: PropTypes.number.isRequired,
  distance: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  from: placeType.isRequired,
  hailedCar: PropTypes.bool.isRequired,
  headsign: PropTypes.string,
  interlineWithPreviousLeg: PropTypes.bool.isRequired,
  intermediateStops: PropTypes.arrayOf(placeType).isRequired,
  interStopGeometry: PropTypes.arrayOf(encodedPolylineType),
  legGeometry: encodedPolylineType.isRequired,
  mode: PropTypes.string.isRequired,
  pathway: PropTypes.bool.isRequired,
  realTime: PropTypes.bool.isRequired,
  rentedBike: PropTypes.bool.isRequired,
  rentedCar: PropTypes.bool.isRequired,
  rentedVehicle: PropTypes.bool.isRequired,
  route: PropTypes.string,
  routeId: PropTypes.string,
  routeType: PropTypes.number,
  serviceDate: PropTypes.string,
  startTime: PropTypes.number.isRequired,
  steps: stepsType.isRequired,
  tncData: PropTypes.shape({
    company: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    estimatedArrival: PropTypes.number.isRequired,
    maxCost: PropTypes.number.isRequired,
    minCost: PropTypes.number.isRequired,
    productId: PropTypes.string.isRequired,
    travelDuration: PropTypes.number.isRequired
  }),
  to: placeType.isRequired,
  transitLeg: PropTypes.bool.isRequired,
  tripBlockId: PropTypes.string,
  tripId: PropTypes.string
});

const moneyType = PropTypes.shape({
  cents: PropTypes.number.isRequired,
  currency: PropTypes.shape({
    defaultFractionDigits: PropTypes.number.isRequired,
    currencyCode: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired
  }).isRequired
});

/**
 * Represents the fare component of an itinerary of an OTP plan response. See
 * detailed documentation in OTP webservice documentation here:
 * http://otp-docs.ibi-transit.com/api/json_Fare.html
 *
 * NOTE: so far the fare includes ONLY a fare encountered on public transit and
 * not any bike rental or TNC rental fees.
 */
export const fareType = PropTypes.shape({
  details: PropTypes.objectOf(
    PropTypes.shape({
      fareId: feedScopedIdType.isRequired,
      price: moneyType.isRequired,
      routes: PropTypes.arrayOf(feedScopedIdType).isRequired
    }).isRequired
  ),
  fare: PropTypes.objectOf(moneyType)
});

/**
 * Represents an itinerary of an OTP plan response. See detailed documentation
 * in OTP webservice documentation here:
 * http://otp-docs.ibi-transit.com/api/json_Itinerary.html
 */
export const itineraryType = PropTypes.shape({
  duration: PropTypes.number.isRequired,
  elevationGained: PropTypes.number.isRequired,
  elevationLost: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  fare: fareType,
  legs: PropTypes.arrayOf(legType).isRequired,
  startTime: PropTypes.number.isRequired,
  tooSloped: PropTypes.bool,
  transfers: PropTypes.number.isRequired,
  transitTime: PropTypes.number.isRequired,
  waitingTime: PropTypes.number.isRequired,
  walkDistance: PropTypes.number.isRequired,
  walkLimitExceeded: PropTypes.bool.isRequired,
  walkTime: PropTypes.number.isRequired
});

/**
 * Used to model a location that is used in planning a trip.
 */
export const locationType = PropTypes.shape({
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  /**
   * This is only used location that a user has saved. Can be either:
   * "home" or "work"
   */
  type: PropTypes.string
});

/**
 * Used to help display the time of day within the context of a particular itinerary.
 */
export const timeOptionsType = PropTypes.shape({
  /**
   * A format string template to be used to display a date using moment.js
   */
  format: PropTypes.string,
  /*
   * The timezone offset in milliseconds if any should be added. This is
   * typically calculated using the itinerary.js#getTimeZoneOffset function.
   */
  offset: PropTypes.number
});

/**
 * This models data about a stop and it's associated routes that is obtained
 * from a transit index API.
 */
export const transitIndexStopWithRoutes = PropTypes.shape({
  /**
   * The stop code if the stop has one
   */
  code: PropTypes.string,
  /**
   * The distance from the user to the stop in meters
   */
  dist: PropTypes.number,
  lat: PropTypes.number,
  lon: PropTypes.number,
  name: PropTypes.string,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      longName: PropTypes.string,
      shortName: PropTypes.string
    })
  )
});

const transitivePlaceType = PropTypes.shape({
  place_id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
});

export const transitiveDataType = PropTypes.shape({
  journeys: PropTypes.arrayOf(
    PropTypes.shape({
      journey_id: PropTypes.string.isRequired,
      journey_name: PropTypes.string.isRequired,
      segments: PropTypes.arrayOf(
        PropTypes.shape({
          arc: PropTypes.bool,
          from: transitivePlaceType,
          patterns: PropTypes.arrayOf(
            PropTypes.shape({
              pattern_id: PropTypes.string.isRequired,
              from_stop_index: PropTypes.number.isRequired,
              to_stop_index: PropTypes.number.isRequired
            })
          ),
          streetEdges: PropTypes.arrayOf(PropTypes.number),
          to: transitivePlaceType,
          type: PropTypes.string.isRequired
        })
      ).isRequired
    })
  ).isRequired,
  patterns: PropTypes.arrayOf(
    PropTypes.shape({
      pattern_id: PropTypes.string.isRequired,
      pattern_name: PropTypes.string.isRequired,
      route_id: PropTypes.string.isRequired,
      stops: PropTypes.arrayOf(
        PropTypes.shape({
          geometry: PropTypes.string,
          stop_id: PropTypes.string.isRequired
        })
      ).isRequired
    })
  ).isRequired,
  places: PropTypes.arrayOf(
    PropTypes.shape({
      place_id: PropTypes.string.isRequired,
      place_lat: PropTypes.number.isRequired,
      place_lon: PropTypes.number.isRequired,
      place_name: PropTypes.string
    })
  ).isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      agency_id: PropTypes.string.isRequired,
      route_id: PropTypes.string.isRequired,
      route_short_name: PropTypes.string.isRequired,
      route_long_name: PropTypes.string.isRequired,
      route_type: PropTypes.number.isRequired,
      route_color: PropTypes.string
    })
  ).isRequired,
  stops: PropTypes.arrayOf(
    PropTypes.shape({
      stop_id: PropTypes.string.isRequired,
      stop_name: PropTypes.string.isRequired,
      stop_lat: PropTypes.number.isRequired,
      stop_lon: PropTypes.number.isRequired
    })
  ).isRequired,
  streetEdges: PropTypes.arrayOf(
    PropTypes.shape({
      edge_id: PropTypes.number.isRequired,
      geometry: encodedPolylineType
    })
  ).isRequired
});

/**
 * Utility function to help create chained validators
 * per https://www.ian-thomas.net/custom-proptype-validation-with-react/
 * @param {*} validator The validator to use.
 */
export function createChainableTypeChecker(validator) {
  function checkType(isRequired, props, propName, componentName, location) {
    componentName = componentName || "ANONYMOUS";
    if (props[propName] == null) {
      if (isRequired) {
        const locationName = ReactPropTypeLocationNames[location];
        return new Error(
          `Required '${locationName}/${propName}' was not specified in '${componentName}'.`
        );
      }
      return null;
    }
    return validator(props, propName, componentName, location);
  }

  const chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

export const latlngType = createChainableTypeChecker((props, propName) => {
  // Source: https://reactjs.org/docs/typechecking-with-proptypes.html#react.proptypes
  if (!isValidLatLng(props[propName])) {
    return new Error(`${propName} needs to be a [lat, lng] array`);
  }
  return null;
});

export const modeOptionType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  showTitle: PropTypes.bool,
  text: PropTypes.node.isRequired,
  title: PropTypes.string
});

export const modeSelectorOptionsType = PropTypes.shape({
  primary: modeOptionType,
  secondary: PropTypes.arrayOf(modeOptionType),
  tertiary: PropTypes.arrayOf(modeOptionType)
});

export const queryType = PropTypes.shape({
  from: PropTypes.string,
  to: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  departArrive: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  mode: PropTypes.string,
  showIntermediateStops: PropTypes.bool,
  maxWalkDistance: PropTypes.number,
  maxBikeDistance: PropTypes.number,
  optimize: PropTypes.string,
  optimizeBike: PropTypes.string,
  maxWalkTime: PropTypes.number,
  walkSpeed: PropTypes.number,
  maxBikeTime: PropTypes.number,
  bikeSpeed: PropTypes.number,
  maxEScooterDistance: PropTypes.number,
  watts: PropTypes.number,
  ignoreRealtimeUpdates: PropTypes.bool,
  companies: PropTypes.string,
  wheelchair: PropTypes.bool
});

export const configuredModeType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    mode: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    company: PropTypes.string
  })
]);

export const configuredModesType = PropTypes.shape({
  transitModes: PropTypes.arrayOf(configuredModeType),
  accessModes: PropTypes.arrayOf(configuredModeType),
  exclusiveModes: PropTypes.arrayOf(configuredModeType),
  bicycleModes: PropTypes.arrayOf(configuredModeType),
  micromobilityModes: PropTypes.arrayOf(configuredModeType)
});

export const configuredCompanyType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  modes: PropTypes.string.isRequired
});

/**
 * Depending on the geocoder that is used, more properties than just the `label`
 * property might be provided by the geocoder. For example, with the Pelias
 * geocoder, properties such as `id`, `layer`, `source` are also included.
 */
export const geocodedFeatureType = PropTypes.shape({
  geometry: PropTypes.shape({
    coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    type: PropTypes.string.isRequired
  }).isRequired,
  properties: PropTypes.shape({
    label: PropTypes.string.isRequired
  }).isRequired
});

export const userLocationType = PropTypes.shape({
  id: PropTypes.string,
  /**
   * Can be either 'home', 'work', or null
   */
  icon: PropTypes.string,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  /**
   * This represents the last time that this location was selected in a
   * search
   */
  timestamp: PropTypes.number,
  /**
   * One of: 'home', 'work', 'stop' or 'recent'
   */
  type: PropTypes.string.isRequired
});
