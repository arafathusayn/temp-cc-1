"use client";


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Calculator() {
  const handleNumberClick = (number: number) => {};

  const handleOperationClick = (op: string) => {};

  const handleCalculate = () => {};

  const handleClear = () => {};

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-secondary p-4 rounded-md mb-4 text-right text-2xl font-mono">
          {"0"}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
            <Button
              key={num}
              onClick={() => handleNumberClick(num)}
              variant="outline"
            >
              {num}
            </Button>
          ))}
          <Button onClick={() => handleOperationClick("+")} variant="secondary">
            +
          </Button>
          <Button onClick={() => handleOperationClick("-")} variant="secondary">
            -
          </Button>
          <Button onClick={() => handleOperationClick("*")} variant="secondary">
            *
          </Button>
          <Button onClick={() => handleOperationClick("/")} variant="secondary">
            /
          </Button>
          <Button
            onClick={handleCalculate}
            className="col-span-2"
            variant="default"
          >
            =
          </Button>
          <Button
            onClick={handleClear}
            className="col-span-2"
            variant="destructive"
          >
            C
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
