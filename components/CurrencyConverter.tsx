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

export default function CurrencyConverter() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Currency Converter</CardTitle>
        <CardDescription>Convert between different currencies.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
          <Label htmlFor="base-currency">Base Currency</Label>
          <Select id="base-currency">
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
              <SelectItem value="JPY">JPY</SelectItem>
              <SelectItem value="AUD">AUD</SelectItem>
              <SelectItem value="CAD">CAD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
          <Label htmlFor="amount">Amount</Label>
          <Input id="amount" type="number" placeholder="Enter amount" />
        </div>
        <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
          <Label htmlFor="target-currency">Target Currency</Label>
          <Select id="target-currency">
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
              <SelectItem value="JPY">JPY</SelectItem>
              <SelectItem value="AUD">AUD</SelectItem>
              <SelectItem value="CAD">CAD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
          <Label htmlFor="converted-amount">Converted Amount</Label>
          <Input
            id="converted-amount"
            type="text"
            placeholder="Converted amount"
            readOnly
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit">Convert</Button>
      </CardFooter>
    </Card>
  );
}
