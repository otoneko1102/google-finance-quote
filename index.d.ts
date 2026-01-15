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
export declare class Finance {
    private param;
    constructor(p?: FinanceParams);
    setFrom(from: string): Finance;
    setTo(to: string): Finance;
    getParam(): {
        from: string | null;
        to: string | null;
    };
    quote(amount?: number): Promise<QuoteResult>;
}
export { symbols, currencyCodesSymbols, cryptocurrencyCodesSymbols };
