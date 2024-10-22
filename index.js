const axios = require('axios');
const HttpsProxyAgent = require('https-proxy-agent');
const { API_URL } = require('./lib/config');

/**
 * @class Finance
 * @description The Finance class is designed to easily check the exchange rate.
 * @param {Object} p - The param includes p.from and p.to.
 * @param {string} p.from - The original currency unit.
 * @param {string} p.to - The desired currency unit.
 * @param {object | undefined} p.proxy - Proxy options.
 */
class Finance {
  constructor(p) {
    if (
      typeof p === 'object' &&
      typeof p?.from === 'string' &&
      typeof p?.to === 'string'
    ) {
      this.param = {
        from: p.from,
        to: p.to
      };
    } else if (typeof p === 'undefined') {
      this.param = {
        from: undefined,
        to: undefined
      };
    } else throw new Error('Invalid parameters.');

    this.proxy = {};
    if (typeof p?.proxy === 'object') {
      if (
        typeof p.proxy?.host === 'string' &&
        (
          p.proxy.protocol === 'http' ||
          p.proxy.protocol === 'https'
        )
      ) {
        this.proxy.host = p.proxy.host;
        if (typeof p.proxy?.port === 'number') this.proxy.port = p.proxy.port;
        this.proxy.protocol = p.proxy.protocol;
      }
    }
  }

  /**
   * @function setFrom
   * @description Set the parameter of from.
   * @param {string} from - The original currency unit.
   * @returns {Finance} Returns the instance of Finance for chaining.
   */
  setFrom(from) {
    if (typeof from !== 'string') throw new Error('from must be string.');
    this.param.from = from;
    return this;
  }

  /**
   * @function setTo
   * @description Set the parameter of to.
   * @param {string} to - The desired currency unit.
   * @returns {Finance} Returns the instance of Finance for chaining.
   */
  setTo(to) {
    if (typeof to !== 'string') throw new Error('to must be string.');
    this.param.to = to;
    return this;
  }

  /**
   * @function getParam
   * @description Returns the current param.
   * @returns Returns the current param.
   */
  getParam() {
    return this.param;
  }

  /**
   * @async
   * @function quote
   * @description Returns the current finance.
   * @param {number} [amount=1] - The amount to convert.
   * @returns Returns the current finance.
   */
  async quote(amount = 1) {
    const result = { success: false, rate: 0 };
    try {
      if (typeof amount !== 'number') throw new Error('amount must be number.');
      const from = this.param.from?.toUpperCase(), to = this.param.to.toUpperCase();
      if (typeof from !== 'string' || typeof to !== 'string') throw new Error('from and/or to are invalid.');

      const url = `${API_URL}${from}-${to}`;

      let response;
      if (this.proxy) {
        const axiosConfig = {};
        if (this.proxy.protocol === 'http') {
          axiosConfig.proxy = {
            host: this.proxy.host,
          }
          if (this.proxy.port) axiosConfig.proxy.port = this.proxy.port;
        } else if (this.proxy.protocol === 'https') {
          const proxyUrl = `http://${this.proxy.host}${this.proxy.port ? `:${this.proxy.port}` : ''}`;
          const agent = new HttpsProxyAgent(proxyUrl);
          axiosConfig.httpsAgent = agent;
          axiosConfig.proxy = false;
        }
        response = await axios.get(url, axiosConfig);
      } else {
        response = await axios.get(url);
      }

      const html = response.data;
      const startIndex =
        html.indexOf(
          `data-source="${from}" data-target="${to}" data-last-price="`
        ) +
        `data-source="${from}" data-target="${to}" data-last-price="`.length;
      const endIndex = html.indexOf('"', startIndex);
      const rate = Number(html.substring(startIndex, endIndex));
      if (isNaN(rate)) throw new Error('Failed to get the current finance.');

      result.success = true;
      result.rate = rate * amount;
      return result;
    } catch {
      return result;
    }
  }
}

module.exports = Finance;
