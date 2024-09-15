import React, { useMemo, useState } from "react";
import { IMAGE } from "../config/image";

import GenerateComponent from "./component/GenerateComponent";
import CodeList from "./component/CodeListComponent";

const VIPCODE = () => {
  const [loading, setLoading] = useState(false);
  const [nav, setNav] = useState("generate");

  return (
    <div className="flex flex-col">
      <nav className="bg-green-700 p-3 flex flex-row gap-2 ">
        <img src={IMAGE.logo} className="w-5" />
        <h1 className="font-bold text-white">VIP CODE GENERATOR</h1>
      </nav>
      <div className="flex flex-row w-full">
        <button
          onClick={() => {
            setNav("generate");
          }}
          className={`p-3 ${
            nav == "generate" ? "bg-green-500" : "bg-green-700"
          } text-white text-xl w-full`}
        >
          Generate
        </button>
        <button
          onClick={() => {
            setNav("codelist");
          }}
          className={`p-3 ${
            nav == "codelist" ? "bg-green-500" : "bg-green-700"
          } text-white text-xl w-full`}
        >
          Code List
        </button>

     
      </div>
      {nav == "generate" ? <GenerateComponent /> : <CodeList />}
    </div>
  );
};

export default VIPCODE;
