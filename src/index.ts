import axios from "axios";
import { API_URL } from "./lib/config";
import { symbols } from "./lib/symbols";
import { currencyCodesSymbols } from "./lib/currencyCodesSymbols";
import { cryptocurrencyCodesSymbols } from "./lib/cryptoCurrencyCodesSymbols";

export interface FinanceParams {
  from?: string | null;
  to?: string | null;
}

export interface QuoteResult {
  success: boolean;
  rate: number;
}

export class Finance {
  private param: { from: string | null; to: string | null };

  constructor(p?: FinanceParams) {
    if (
      typeof p === "object" &&
      (symbols.includes(p?.from?.toUpperCase() || "") ||
        symbols.includes(p?.to?.toUpperCase() || ""))
    ) {
      this.param = {
        from: p.from?.toUpperCase() || null,
        to: p.to?.toUpperCase() || null,
      };
    } else if (typeof p === "undefined") {
      this.param = { from: null, to: null };
    } else {
      throw new Error("Invalid parameters.");
    }
  }

  setFrom(from: string): Finance {
    if (!symbols.includes(from?.toUpperCase()))
      throw new Error("invalid from.");
    this.param.from = from.toUpperCase();
    return this;
  }

  setTo(to: string): Finance {
    if (!symbols.includes(to?.toUpperCase())) throw new Error("invalid to.");
    this.param.to = to.toUpperCase();
    return this;
  }

  getParam() {
    return this.param;
  }

  async quote(amount = 1): Promise<QuoteResult> {
    const result: QuoteResult = { success: false, rate: 0 };
    try {
      if (typeof amount !== "number") throw new Error("amount must be number.");

      const from = this.param.from;
      const to = this.param.to;
      if (!symbols?.includes(from || "") || !symbols?.includes(to || ""))
        throw new Error("from and/or to are invalid.");

      const url = `${API_URL}${from}-${to}`;
      const response = await axios.get<string>(url);
      const html = response.data;

      const startIndex =
        html.indexOf(
          `data-source="${from}" data-target="${to}" data-last-price="`,
        ) +
        `data-source="${from}" data-target="${to}" data-last-price="`.length;
      const endIndex = html.indexOf('"', startIndex);
      const rate = Number(html.substring(startIndex, endIndex));
      if (isNaN(rate)) throw new Error("Failed to get the current finance.");

      result.success = true;
      result.rate = rate * amount;
      return result;
    } catch {
      return result;
    }
  }
}

export { symbols, currencyCodesSymbols, cryptocurrencyCodesSymbols };
