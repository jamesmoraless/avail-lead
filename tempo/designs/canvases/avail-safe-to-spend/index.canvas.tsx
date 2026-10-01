import { Canvas, Storyboard } from "tempo-sdk/canvas";
import Homedaylight from "./HomeDaylight";
import Homegarden from "./HomeGarden";
import Whythisnumber from "./WhyThisNumber";
import Whatchanged from "./WhatChanged";
import Onboardingwelcome from "./OnboardingWelcome";
import Connectbank from "./ConnectBank";
import Buildingplan from "./BuildingPlan";
import Billsincomegoals from "./BillsIncomeGoals";
import Direction from "./Direction";
import HomeExhale from "./HomeExhale";
import HomeCurtain from "./HomeCurtain";
import HomeForecast from "./HomeForecast";
import HomeLetter from "./HomeLetter";
import HomePath from "./HomePath";

export default function AvailSafeToSpendCanvas() {
  return (
    <Canvas name="Avail Safe To Spend" backgroundColor="#E9E4DA">
      <Storyboard
        id="Direction"
        name="0 · Design direction — read first"
        component={Direction}
        layout={{ x: 15, y: -2, width: 1990, height: 470, intrinsicSizing: "root-element" }}
      />

      {/* Radical homes — each one is a different metaphor, each one you can touch */}
      <Storyboard
        id="HomeExhale"
        name="R1 · Exhale — press and hold to breathe"
        component={HomeExhale}
        layout={{ x: 0, y: 560, width: 474, height: 928, intrinsicSizing: "root-element" }}
      />
      <Storyboard
        id="HomeCurtain"
        name="R2 · The Curtain — pull it to see how"
        component={HomeCurtain}
        layout={{ x: 505, y: 560, width: 474, height: 928, intrinsicSizing: "root-element" }}
      />
      <Storyboard
        id="HomeForecast"
        name="R3 · The Forecast — can I afford this?"
        component={HomeForecast}
        layout={{ x: 1010, y: 560, width: 474, height: 928, intrinsicSizing: "root-element" }}
      />
      <Storyboard
        id="HomeLetter"
        name="R4 · The Letter — a note on the desk"
        component={HomeLetter}
        layout={{ x: 1515, y: 560, width: 474, height: 928, intrinsicSizing: "root-element" }}
      />
      <Storyboard
        id="HomePath"
        name="R5 · The Horizon — the week is a sunrise"
        component={HomePath}
        layout={{ x: 2020, y: 560, width: 474, height: 928, intrinsicSizing: "root-element" }}
      />

      {/* Every morning */}
      <Storyboard
        id="HomeDaylight"
        name="1A · Home — Morning brief"
        component={Homedaylight}
        layout={{ x: 0, y: 4365, width: 474, height: 928, intrinsicSizing: "root-element" }}
      />
      <Storyboard
        id="HomeGarden"
        name="1B · Home — One number"
        component={Homegarden}
        layout={{ x: 505, y: 4365, width: 474, height: 928, intrinsicSizing: "root-element" }}
      />
      <Storyboard
        id="WhyThisNumber"
        name="2 · Why this number"
        component={Whythisnumber}
        layout={{ x: 1010, y: 4365, width: 474, height: 928, intrinsicSizing: "root-element" }}
      />
      <Storyboard
        id="WhatChanged"
        name="3 · What changed"
        component={Whatchanged}
        layout={{ x: 1515, y: 4365, width: 474, height: 928, intrinsicSizing: "root-element" }}
      />

      {/* First run, and the plan */}
      <Storyboard
        id="OnboardingWelcome"
        name="4 · Welcome"
        component={Onboardingwelcome}
        layout={{ x: 0, y: 5385, width: 474, height: 928, intrinsicSizing: "root-element" }}
      />
      <Storyboard
        id="ConnectBank"
        name="5 · Connect your bank (Plaid)"
        component={Connectbank}
        layout={{ x: 505, y: 5385, width: 474, height: 928, intrinsicSizing: "root-element" }}
      />
      <Storyboard
        id="BuildingPlan"
        name="6 · Building your plan"
        component={Buildingplan}
        layout={{ x: 1010, y: 5385, width: 474, height: 928, intrinsicSizing: "root-element" }}
      />
      <Storyboard
        id="BillsIncomeGoals"
        name={"7 · Your plan — bills, income, goals"}
        component={Billsincomegoals}
        layout={{ x: 1515, y: 5385, width: 474, height: 928, intrinsicSizing: "root-element" }}
      />
    </Canvas>
  );
}
