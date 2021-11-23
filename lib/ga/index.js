import { MEASUREMENT_ID } from "@config/index";

// log the pageview with their URL
export const pageview = (url) => {
  window.gtag("config", MEASUREMENT_ID, {
    page_path: url,
  });
};

// log specific events happening.
export const event = ({ action, params }) => {
  window.gtag("event", action, params);
};
