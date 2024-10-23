declare module 'google-finance-quote' {
  /**
   * @interface Proxy
   * @description Interface for proxy parameters.
   * @property {string} host - Proxy host name.
   * @property {number | undefined} - Proxy port number.
   * @property {'http' | 'https'} protocol - Proxy protocol type.
   */
  interface Proxy {
    host: string;
    port?: number,
    protocol: 'http' | 'https';
  }

  /**
   * @interface FinanceParams
   * @description Interface for Finance class constructor parameters.
   * @property {string} from - The original currency symbol.
   * @property {string} to - The desired currency symbol.
   * @property {Proxy | undefined} proxy - Proxy options.
   */
  interface FinanceParams {
    from: string;
    to: string;
  }

  /**
   * @class Finance
   * @description The Finance class is designed to easily check the exchange rate.
   * @param {FinanceParams | undefined} p - The parameters, including p.from and p.to.
   */
  class Finance {
    private param: FinanceParams;

    constructor(p?: FinanceParams);

    /**
     * @function setFrom
     * @description Set the parameter of from.
     * @param {string} from - The original currency symbol.
     * @returns {Finance} Returns the instance of Finance for chaining.
     */
    setFrom(from: string): Finance;

    /**
     * @function setTo
     * @description Set the parameter of to.
     * @param {string} to - The desired currency symbol.
     * @returns {Finance} Returns the instance of Finance for chaining.
     */
    setTo(to: string): Finance;

    /**
     * @function getParam
     * @description Returns the current param.
     * @returns {FinanceParams} Returns the current param.
     */
    getParam(): FinanceParams;

    /**
     * @async
     * @function quote
     * @description Returns the current finance rate.
     * @param {number} [amount=1] - The amount to convert.
     * @returns {Promise<{ success: boolean; rate: number }>} Returns the converted amount based on the exchange rate.
     */
    quote(amount?: number): Promise<{ success: boolean; rate: number }>;
  }

  export = Finance;
}
