# google-finance-quote
Node Google Finance API wrapper for free.
No API key is required!
> Note: This results may vary by up to 20 minutes.
## Usage
### Get Started
```js
const { Finance, symbols } = require("google-finance-quote");

console.log(symbols); // Returns available symbols.

const finance = new Finance(); // You can use this: new Finance({ from 'USD', to: 'JPY' });
// You can use http(s) proxies.
/*
const proxy = {
  host: 'example.com',
  port: 2000,
  protocol: 'http'
}
const finance = new Finance({ proxy });
*/

finance
  .setFrom('USD');
  .setTo('JPY');

(async () => {
  console.log(await finance.quote()); // { success: true, rate: 150.94225699999998 }
})();
```
### Class
<strong>Finance({ from?:string, to?:string, proxy?:object })</strong>

### Functions
- <strong>.setFrom(from: string)</strong>
Set the parameter of from.

- <strong>.setTo(to: string)</strong>
Set the parameter of to.

- <strong>.getParam(): object</strong>
Returns the current param.

- <strong>.quote(amount?: number): Promise<{ success: boolean, rate: number }></strong>
Returns the converted amount based on the exchange rate.
> Note: If the current rate cannot be obtained due to rate limits or network errors, success: false is returned.
## Get Support
<a href="https://discord.gg/yKW8wWKCnS"><img src="https://discordapp.com/api/guilds/1005287561582878800/widget.png?style=banner4" alt="Discord Banner"/></a>
