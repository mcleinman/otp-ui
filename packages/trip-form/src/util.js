import React from "react";
import {
  hasRental,
  hasHail,
  isBicycle,
  isBicycleRent,
  isMicromobility,
  isTransit,
  isWalk
} from "@opentripplanner/core-utils/lib/itinerary";
import { getCompanyIcon } from "@opentripplanner/icons/lib/companies";

import ModeIcon from "./ModeIcon";

export function isBike(mode) {
  return isBicycle(mode) || isBicycleRent(mode);
}

const supportedExclusiveModes = [
  {
    mode: "WALK",
    label: "Walk Only",
    isActive: isWalk
  },
  {
    mode: "BICYCLE",
    label: "Bike Only",
    isActive: isBike
  },
  {
    mode: "MICROMOBILITY",
    label: "E-scooter Only",
    isActive: isMicromobility
  }
];

/**
 * Obtains the mode-as-a-string from a mode object found in the configuration.
 * In config.yaml, you can write either:
 *   transitModes:    -or-   transitModes:
 *   - BUS                   - mode: BUS
 *   - RAIL                    label: Bus
 *                           - mode: RAIL
 *                             label: Commuter Rail
 *
 * @param modeObj The mode object per the configuration to convert.
 */
export function getModeString(modeObj) {
  return modeObj.mode || modeObj;
}

export function getTransitSubmodeOptions(modes, selectedModes) {
  const { transitModes } = modes;

  // FIXME: If only one transit mode is available, select it.
  return transitModes.map(modeObj => {
    const modeStr = getModeString(modeObj);
    return {
      id: modeStr,
      selected: selectedModes.includes(modeStr),
      text: (
        <span>
          <ModeIcon mode={modeStr} />
          {modeObj.label}
        </span>
      ),
      title: modeObj.label
    };
  });
}

function getPrimaryModeOption(selectedModes) {
  return {
    id: "TRANSIT",
    selected: selectedModes.some(isTransit) && selectedModes.includes("WALK"),
    showTitle: false,
    text: (
      <span>
        <ModeIcon mode="transit" />
        Take Transit
      </span>
    ),
    title: "Take Transit"
  };
}

function getTransitCombinedModeOptions(modes, selectedModes) {
  const { accessModes } = modes;
  const modesHaveTransit = selectedModes.some(isTransit);

  return (
    accessModes &&
    accessModes.map(modeObj => {
      const modeStr = getModeString(modeObj);
      return {
        id: `TRANSIT+${modeStr}${modeObj.company ? `+${modeObj.company}` : ""}`,
        selected: modesHaveTransit && selectedModes.includes(modeStr),
        text: (
          <span>
            <ModeIcon mode="transit" />+<ModeIcon mode={modeStr} />
          </span>
        ),
        title: modeObj.label
      };
    })
  );
}

function getExclusiveModeOptions(modes, selectedModes) {
  const { exclusiveModes } = modes;

  return supportedExclusiveModes
    .filter(mode => exclusiveModes && exclusiveModes.includes(mode.mode))
    .map(modeObj => ({
      id: modeObj.mode,
      selected:
        !selectedModes.some(isTransit) && selectedModes.some(modeObj.isActive),
      showTitle: false,
      text: (
        <span>
          <ModeIcon mode={modeObj.mode} /> {modeObj.label}
        </span>
      ),
      title: modeObj.label
    }));
}

/**
 * Generates the options (primary, secondary, tertiary) for the mode selector based on the modes read from config.yaml.
 * @param {*} modes The modes defined in config.yaml.
 * @param {*} selectedModes An array of string that lists the modes selected for a trip query.
 */
export function getModeOptions(modes, selectedModes) {
  return {
    primary: getPrimaryModeOption(selectedModes),
    secondary: getTransitCombinedModeOptions(modes, selectedModes),
    tertiary: getExclusiveModeOptions(modes, selectedModes)
  };
}

/**
 * Of the specified companies, returns those that operate the specified modes.
 * @param {*} companies The supported companies per OTP configuration.
 * @param {*} modes The desired modes for which to get the operating companies.
 * @returns An array of companies that operate the specified modes, or undefined if companies is undefined.
 */
export function getCompanies(companies, modes) {
  return (
    companies &&
    companies
      .filter(
        comp => comp.modes.split(",").filter(m => modes.includes(m)).length > 0
      )
      .filter(comp => hasRental(comp.modes) || hasHail(comp.modes))
  );
}

/**
 * Returns the UI options for the specified companies, modes, and selection.
 * @param {*} companies The supported companies per OTP configuration.
 * @param {*} modes The desired modes for which to get the operating companies.
 * @param {*} selectedCompanies The companies to render selected from the UI.
 * @returns An array of UI options, or undefined if companies is undefined.
 */
export function getCompaniesOptions(companies, modes, selectedCompanies) {
  const comps = getCompanies(companies, modes);
  return (
    comps &&
    comps.map(comp => {
      const CompanyIcon = getCompanyIcon(comp.id);

      return {
        id: comp.id,
        selected: selectedCompanies.includes(comp.id),
        text: (
          <span>
            <CompanyIcon /> {comp.label}
          </span>
        ),
        title: comp.label
      };
    })
  );
}

/**
 * Returns the UI options for the specified bike/micromobility modes and selection.
 * @param {*} modes The supported bike or micromobility modes.
 * @param {*} selectedModes The modes to render selected from the UI.
 * @returns An array of UI options, or undefined if modes is undefined.
 */
export function getBicycleOrMicromobilityModeOptions(modes, selectedModes) {
  return (
    modes &&
    modes.map(mode => {
      return {
        id: mode.mode,
        selected: selectedModes.includes(mode.mode),
        text: (
          <span>
            <ModeIcon mode={mode.mode} /> {mode.label}
          </span>
        ),
        title: mode.label
      };
    })
  );
}
