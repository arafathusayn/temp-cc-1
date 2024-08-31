export function Sample() {
  return (
    <div>
      <Heading>
        <h1>Head</h1>
      </Heading>
    </div>
  );
}

function Heading({ children }: any) {
  return (
    <div>
      {children}

      <p>Paragraph</p>
    </div>
  );
}
