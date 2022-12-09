import React from "react";

export const Pancake = () => {
  return (
    <body className="page-pancake">
      <header className="pad blue">
        <span>header</span>
      </header>
      <main className="pad teal-green">
        <span>main</span>
      </main>
      <footer className="pad orange">
        <span>footer</span>
      </footer>
    </body>
  );
};

export const Dashboard = () => {
  return (
    <body className="page-dashboard">
      <div className="pad blue">
        <span>logo</span>
      </div>
      <header className="pad yellow">header</header>
      <aside className="pad teal-green">
        <span>aside</span>
      </aside>
      <main className="pad orange">
        <span>main</span>
      </main>
    </body>
  );
};
