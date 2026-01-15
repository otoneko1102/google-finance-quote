# google-finance-quote

Node Google Finance API wrapper for free.
No API key is required!

> [!NOTE]
> This results may vary by up to 20 minutes.

> [!NOTE]
> `3.0.0 <= x` doesn't support proxies.

## Usage

### Get Started

```js
// ESM
import { Finance, symbols, currencyCodesSymbols, cryptoCurrencyCodesSymbols } from "google-finance-quote";
// CJS
const { Finance, symbols, currencyCodesSymbols, cryptoCurrencyCodesSymbols } = require("google-finance-quote");

console.log(symbols); // Returns available symbols.
console.log(currencyCodesSymbols); // Returns available currency codes symbols.
console.log(cryptoCurrencyCodesSymbols); // Returns available crypto currency codes symbols.

const finance = new Finance(); // You can use this: new Finance({ from 'USD', to: 'JPY' });

finance
  .setFrom('USD')
  .setTo('JPY');

(async () => {
  console.log(await finance.quote()); // { success: true, rate: 150.94225699999998 }
})();
```

### Class

- **Finance({ from?: string, to?: string })**

  - **.setFrom(from: string)**
  Set the parameter of from.
  - **.setTo(to: string)**
  Set the parameter of to.
  - **.getParam(): object**
  Returns the current param.
  - **.quote(amount?: number): Promise<{ success: boolean, rate: number }>**
  Returns the converted amount based on the exchange rate.

> Note: If the current rate cannot be obtained due to rate limits or network errors, success: false is returned.
