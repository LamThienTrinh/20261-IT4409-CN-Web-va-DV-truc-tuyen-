import React from "react";

function UserCard({ name, age }) {
  return (
    <div>
      <h3>Tên: {name}</h3>
      <p>Tuổi: {age}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <UserCard name="Alice" age={22} />
    </div>
  );
}

export { UserCard };
export default App;
