import React, { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { createVIPCode, getVIPCodes } from "../../server/api";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CodeList = () => {
  const [loading, setLoading] = useState(false);
  const [NOD, setNOD] = useState("");
  const [codedata, setCodedata] = useState([]);

  const vipCodes = useQuery("vipcodes", getVIPCodes);

  const codesdata = useMemo(() => {
    if (vipCodes.data) {
      return vipCodes.data.data;
    }
  }, [vipCodes.data]);

  const createCode = useMutation(createVIPCode, {
    onMutate: () => {
      setLoading(true);
    },
    onError: () => {
      setLoading(false);
    },
    onSuccess: (res) => {
      setLoading(false);
      setCodedata(res.data);
      vipCodes.refetch();
    },
  });

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  const RenderItem = ({ item }) => {
    console.log(item)
    return (
      <div
        className={`p-4 mb-2 rounded-lg shadow ${
          item?.is_used ? "bg-green-500" : "bg-white"
        } flex justify-between`}
      >
        <span className="text-black text-xl font-semibold">{item.code}</span>
        <h1>{item.is_used}</h1>
        <CopyToClipboard text={item.code} onCopy={()=> console.log("copied")}>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
            onClick={() => handleCopy(item.code)}
          >
            Copy
          </button>
        </CopyToClipboard>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">Loading...</div>
        </div>
      )}
      <h1 className="text-2xl font-bold text-black mb-4">Generate VIP Code</h1>
      <div className="mb-4">
        <label className="block text-black text-md mb-2">
          Number of Devices:
        </label>
        <input
          type="number"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          placeholder="Enter number of devices"
          value={NOD}
          onChange={(e) => setNOD(e.target.value)}
        />
        <button
          onClick={() => createCode.mutate({ nod: NOD })}
          className="w-full bg-green-500 text-white font-bold p-3 rounded-lg hover:bg-green-400"
        >
          {loading ? "Creating..." : "Create Code"}
        </button>
      </div>

      <div className="divider h-1 bg-gray-300 my-4"></div>

      <div className="code-list">
        <h2 className="text-xl font-semibold mb-4">Generated Codes:</h2>
        {codesdata &&
          codesdata.map((item, index) => (
            <RenderItem key={index} item={item} />
          ))}
      </div>
    </div>
  );
};

export default CodeList;
