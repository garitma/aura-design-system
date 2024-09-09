import React from "react";

import Skeleton from "@aura-design/system/dist/components/skeleton";

export const Basic = () => (
  <Skeleton widthAspectRation={5} heightAspectRation={5} />
);
export const Circle = () => (
  <Skeleton widthAspectRation={5} heightAspectRation={5} isCircle />
);
export const Fluid = () => (
  <Skeleton widthAspectRation={5} heightAspectRation={5} isFluid />
);
export const Example = () => (
  <>
    <header className="aura">
      <nav>
        <ul className="nav-list">
          <li>
            <Skeleton
              heightAspectRation={4.5}
              widthAspectRation={4.5}
              isCircle
            />
          </li>
          <li></li>
          <li>
            <Skeleton heightAspectRation={3} widthAspectRation={10} />
          </li>
        </ul>
      </nav>
    </header>
    <aside className="white">
      <div className="mt13">
        {[0, 1, 2].map((item, index) => (
          <div className="mb13" key={index}>
            <Skeleton heightAspectRation={5} widthAspectRation={5} isFluid />
          </div>
        ))}
      </div>
    </aside>
    <div className="pad snow">
      <div>
        <div className="smush">
          <div className="aureole one">
            <Skeleton heightAspectRation={3} className="fluid" />
            <Skeleton heightAspectRation={1} className="fluid" />
            <Skeleton heightAspectRation={40} className="fluid" />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </>
);
