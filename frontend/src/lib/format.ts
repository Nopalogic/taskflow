/**
 * Formats a number as currency according to specified locale and currency code
 *
 * @param {string} locale - The BCP 47 language tag (e.g., 'en-US', 'id-ID')
 * @param {string} currencyCode - The ISO 4217 currency code (e.g., 'USD', 'IDR')
 * @param {number} amount - The numeric value to format
 * @param {Object} [options] - Additional formatting options
 * @param {number} [options.fractionDigits=0] - Number of fraction digits to display
 * @returns {string} Formatted currency string
 *
 * @example
 * formatCurrency('id-ID', 'IDR', 50000);   // "Rp50.000"
 * formatCurrency('en-US', 'USD', 1234.56); // "$1,235"
 * formatCurrency('en-US', 'USD', 1234.56, { fractionDigits: 2 }); // "$1,234.56"
 */
export const formatCurrency = (
  locale: string,
  currencyCode: string,
  amount: number,
  options: { fractionDigits?: number } = {},
): string => {
  const { fractionDigits = 0 } = options;

  if (isNaN(amount)) {
    throw new Error("Invalid amount: must be a number");
  }

  if (!currencyCode || typeof currencyCode !== "string") {
    throw new Error("Invalid currency code: must be a non-empty string");
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: fractionDigits,
      minimumFractionDigits: fractionDigits,
    }).format(amount);
  } catch (error) {
    throw new Error(
      `Currency formatting failed: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

/**
 * Formats a date into a localized string representation (Indonesian locale by default).
 *
 * @param date - The date to format. Can be a Date object, ISO string, or timestamp.
 * @param variant - The month format variant. Options:
 *                  - "numeric" (e.g., 1)
 *                  - "2-digit" (e.g., 01)
 *                  - "long" (e.g., Januari)
 *                  - "short" (e.g., Jan)
 *                  - "narrow" (e.g., J)
 *                  Defaults to "long" if not specified.
 * @returns Formatted date string in Indonesian locale (e.g., "5 Januari 2023").
 * @throws Error if date parameter is missing or invalid.
 *
 * @example
 * formatDate(new Date(), 'long')    // "5 Januari 2023"
 * formatDate('2023-01-05', 'short') // "5 Jan 2023"
 * formatDate(1672876800000, 'numeric') // "5 1 2023"
 */
export const formatDate = (
  date: Date | string | number,
  variant: "numeric" | "2-digit" | "long" | "short" | "narrow" = "long",
): string => {
  if (!date) {
    throw new Error("Date parameter is required");
  }

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date: Unable to parse input");
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: variant,
    year: "numeric",
  }).format(parsedDate);
};

export const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("id-ID", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

export const formatLabel = (label: string) => {
  const statusText = new Map<string, string>([
    ["not_started", "Not Started"],
    ["in_progress", "In Progress"],
    ["completed", "Completed"],
    ["archived", "Archived"],
    ["todo", "Todo"],
    ["low", "Low"],
    ["medium", "Medium"],
    ["high", "High"],
  ]);

  return statusText.get(label);
};
