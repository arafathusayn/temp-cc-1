"use client";

import { createContext, useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AppContext = createContext({
  targetCurrency: "",
  setTargetCurrency: (value: string) => {},
  convertedAmount: "",
  setConvertedAmount: (value: string) => {},
  exchangeRatesCache: null as Record<string, number> | null,
  setExchangeRatesCache: (value: Record<string, number> | null) => {},
  currencies: ["USD", "EUR", "GBP", "BDT"],
});
const AmountContext = createContext({
  amount: "",
  setAmount: (value: string) => {},
});
const TargetCurrencyContext = createContext({
  targetCurrency: "",
  setTargetCurrency: (value: string) => {},
});
const ConvertedAmountContext = createContext({
  convertedAmount: "",
  setConvertedAmount: (value: string) => {},
});

const AmountProvider = ({ children }: any) => {
  const [amount, setAmount] = useState("");

  return (
    <AmountContext.Provider value={{ amount, setAmount }}>
      {children}
    </AmountContext.Provider>
  );
};

const TargetCurrencyProvider = ({ children }: any) => {
  const [targetCurrency, setTargetCurrency] = useState<string>("USD");
  return (
    <TargetCurrencyContext.Provider
      value={{ targetCurrency, setTargetCurrency }}
    >
      {children}
    </TargetCurrencyContext.Provider>
  );
};

const ConvertedAmountProvider = ({ children }: any) => {
  const [convertedAmount, setConvertedAmount] = useState("");
  return (
    <ConvertedAmountContext.Provider
      value={{ convertedAmount, setConvertedAmount }}
    >
      {children}
    </ConvertedAmountContext.Provider>
  );
};

const BaseCurrencyContext = createContext({
  baseCurrency: "",
  setBaseCurrency: (value: string) => {},
});

function BaseCurrencyProvider({ children }: any) {
  const [baseCurrency, setBaseCurrency] = useState("");

  return (
    <BaseCurrencyContext.Provider value={{ baseCurrency, setBaseCurrency }}>
      {children}
    </BaseCurrencyContext.Provider>
  );
}

export default function CurrencyConverter() {
  const [targetCurrency, setTargetCurrency] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");

  const [exchangeRatesCache, setExchangeRatesCache] = useState<Record<
    string,
    number
  > | null>(null);

  const { currencies } = useContext(AppContext);

  return (
    <AppContext.Provider
      value={{
        targetCurrency,
        setTargetCurrency,
        convertedAmount,
        setConvertedAmount,
        exchangeRatesCache,
        setExchangeRatesCache,
        currencies,
      }}
    >
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Currency Converter</CardTitle>
          <CardDescription>
            Convert between different currencies.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
            <Label htmlFor="base-currency">Base Currency</Label>

            <BaseCurrencyProvider>
              <SelectBaseCurrency />
            </BaseCurrencyProvider>
          </div>
          <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
            <Label htmlFor="amount">Amount</Label>

            <AmountProvider>
              <AmountInput />
            </AmountProvider>
          </div>
          <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
            <Label htmlFor="target-currency">Target Currency</Label>

            <BaseCurrencyProvider>
              <SelectTargetCurrency />
            </BaseCurrencyProvider>
          </div>
          <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
            <Label htmlFor="converted-amount">Converted Amount</Label>
            <Input
              id="converted-amount"
              type="text"
              placeholder="Converted amount"
              value={convertedAmount}
              readOnly
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <BaseCurrencyProvider>
            <ConvertButton />
          </BaseCurrencyProvider>
        </CardFooter>
      </Card>
    </AppContext.Provider>
  );
}

function AmountInput() {
  const { amount, setAmount } = useContext(AmountContext);

  return (
    <Input
      id="amount"
      type="number"
      placeholder="Enter amount"
      value={amount}
      onChange={(event) => {
        const value = event.target.value;
        setAmount(value);
      }}
    />
  );
}

function SelectTargetCurrency() {
  const { targetCurrency, setTargetCurrency, currencies } =
    useContext(AppContext);

  const { baseCurrency } = useContext(BaseCurrencyContext);

  const filteredCurrencies = currencies.filter(
    (currency) => currency !== baseCurrency,
  );

  return (
    <Select
      value={targetCurrency}
      onValueChange={(currency) => {
        setTargetCurrency(currency);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent>
        {filteredCurrencies.map((currency) => (
          <SelectItem key={currency} value={currency}>
            {currency}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function SelectBaseCurrency() {
  const { currencies } = useContext(AppContext);

  const { baseCurrency, setBaseCurrency } = useContext(BaseCurrencyContext);

  return (
    <Select
      value={baseCurrency}
      onValueChange={(currency) => {
        setBaseCurrency(currency);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency} value={currency}>
            {currency}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function ConvertButton() {
  const { amount } = useContext(AmountContext);
  const {
    targetCurrency,
    setConvertedAmount,
    exchangeRatesCache,
    setExchangeRatesCache,
  } = useContext(AppContext);

  const { baseCurrency } = useContext(BaseCurrencyContext);

  return (
    <Button
      type="submit"
      onClick={async () => {
        let exchangeRates;

        if (!exchangeRatesCache) {
          try {
            const response = await fetch(
              "https://static.tripovy.com/exchange_rates.json",
            );

            if (!response.ok) {
              throw new Error("Failed to fetch exchange rates.");
            }

            exchangeRates = (await response.json()) as Record<string, number>;

            setExchangeRatesCache(exchangeRates);
          } catch (error) {
            alert("Failed to connect to the server.");
          }
        } else {
          exchangeRates = exchangeRatesCache;
        }

        if (!exchangeRates) {
          return;
        }

        const baseCurrencyRate = exchangeRates[baseCurrency];
        const targetCurrencyRate = exchangeRates[targetCurrency];

        const target =
          (1 / baseCurrencyRate) * targetCurrencyRate * Number(amount);

        setConvertedAmount(target.toFixed(2));
      }}
      disabled={!baseCurrency || !amount || !targetCurrency}
    >
      Convert
    </Button>
  );
}
