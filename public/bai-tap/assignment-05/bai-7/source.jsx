import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>Tăng</button>{" "}
      <button onClick={() => setCount(prev => prev - 1)}>Giảm</button>
    </div>
  );
}

export { Counter };
export default Counter;
