import React from "react";
import Section from "../../layout/section";

export const Default = () => (
  <Section>
    Cada abrazo de oso contiene: 1 dosis de amor por cada 2 brazos. Posología:
    Aplicar un abrazo osado con un apretón fuerte profundamente en el alma 1 ó 2
    veces por herida, preferiblemente en la noche durante varios días según
    prescripción. Indicaciones: Antidepresivo de uso diario. Contra
    indicaciones: Hipersensibilidad y lagrimeo excesivo. Precauciones y
    advertencias: Se debe evitar el uso concomitante de otros productos que
    contengan el componente de SORPRESA pues éste puede reducir su efectividad.
    Dosis altas de cualquier SORPRESA probablemente conllevan un mayor riesgo de
    estas reacciones, aunque los estudios clínicos controlados muestran que esto
    no sucede en los casos donde el corazón lo necesitaba.
  </Section>
);

export const WithColor = () => (
  <Section color="teal-green">
    Cada abrazo de oso contiene: 1 dosis de amor por cada 2 brazos. Posología:
    Aplicar un abrazo osado con un apretón fuerte profundamente en el alma 1 ó 2
    veces por herida, preferiblemente en la noche durante varios días según
    prescripción. Indicaciones: Antidepresivo de uso diario. Contra
    indicaciones: Hipersensibilidad y lagrimeo excesivo. Precauciones y
    advertencias: Se debe evitar el uso concomitante de otros productos que
    contengan el componente de SORPRESA pues éste puede reducir su efectividad.
    Dosis altas de cualquier SORPRESA probablemente conllevan un mayor riesgo de
    estas reacciones, aunque los estudios clínicos controlados muestran que esto
    no sucede en los casos donde el corazón lo necesitaba.
  </Section>
);

export const WithContainer = () => (
  <>
    <Section color="teal-green" container="smesh">
      <h3 className="h6">Smesh 1600px</h3>
      Cada abrazo de oso contiene: 1 dosis de amor por cada 2 brazos. Posología:
      Posología: Aplicar un abrazo osado con un apretón fuerte profundamente en
      el alma 1 ó 2 veces por herida
    </Section>
    <Section color="blue" container="smush">
      <h3 className="h6">Smush 1032px</h3>
      Cada abrazo de oso contiene: 1 dosis de amor por cada 2 brazos. Posología:
      Posología: Aplicar un abrazo osado con un apretón fuerte profundamente en
      el alma 1 ó 2 veces por herida
    </Section>
    <Section color="lemon-green" container="smash">
      <h3 className="h6">Smash 740px</h3>
      Cada abrazo de oso contiene: 1 dosis de amor por cada 2 brazos. Posología:
      Posología: Aplicar un abrazo osado con un apretón fuerte profundamente en
      el alma 1 ó 2 veces por herida
    </Section>
    <Section color="pink" container="smosh">
      <h3 className="h6">Smosh 440px</h3>
      Cada abrazo de oso contiene: 1 dosis de amor por cada 2 brazos. Posología:
    </Section>
    <Section color="yellow" container="smish">
      <h3 className="h6">Smish 250px</h3>
      Cada abrazo de oso contiene: 1 dosis de amor por cada 2 brazos.
    </Section>
  </>
);

export const WithSubClassName = () => (
  <Section color="pink" container="smash" subClassName="green aura">
    <h3 className="h6">subClassName box</h3>
    Cada abrazo de oso contiene: 1 dosis de amor por cada 2 brazos.
  </Section>
);

export const WithPassDiv = () => (
  <Section color="blue" passDiv>
    <h3 className="h6">This section use div html tag as wrapper </h3>
    Cada abrazo de oso contiene: 1 dosis de amor por cada 2 brazos.
  </Section>
);

