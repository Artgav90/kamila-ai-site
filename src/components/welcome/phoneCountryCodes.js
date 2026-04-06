export const PHONE_COUNTRY_OPTIONS = Object.freeze([
  { value: "+49", label: "DE +49", country: "Germany" },
  { value: "+380", label: "UA +380", country: "Ukraine" },
  { value: "+7", label: "RU +7", country: "Russia" },
  { value: "+7-KZ", label: "KZ +7", country: "Kazakhstan" }
]);

export const DEFAULT_PHONE_COUNTRY_OPTION = PHONE_COUNTRY_OPTIONS[0];

export function resolveDialCode(optionValue) {
  if (optionValue === "+7-KZ") {
    return "+7";
  }

  return optionValue;
}
