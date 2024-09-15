import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { createVIPCode, getVIPCodes } from "../../server/api";

const GenerateComponent = () => {
  const [loading, setLoading] = useState(false);
  const [NOD, setNOD] = useState(''); // Number of Devices
  const [codedata, setCodedata] = useState([]);
  const [copied, setCopied] = useState(false);

  const vipCodes = useQuery("vipcodes", getVIPCodes);

  useEffect(() => {
    vipCodes.refetch();
  }, []);

  const createCode = useMutation(createVIPCode, {
    onMutate: () => {
      setLoading(true);
    },
    onError: () => {
      setLoading(false);
    },
    onSuccess: (res) => {
      setLoading(false);
      setCodedata(res.data); // Save the generated codes
      vipCodes.refetch();
    },
  });

  const handleCreateCode = () => {
    if (NOD) {
      createCode.mutate({ nod: NOD });
    }
  };

  const RenderItem = ({ item }) => {
    return (
      <div className="code-item flex justify-between p-3 bg-white mb-2 rounded-lg shadow">
        <span className="text-black text-lg font-bold">{item}</span>
        <CopyToClipboard text={item} onCopy={() => setCopied(true)}>
          <button className="copy-btn bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400">
            Copy
          </button>
        </CopyToClipboard>
      </div>
    );
  };

  return (
    <div className="generate-component container mx-auto p-6">
      <h1 className="text-2xl font-bold text-black mb-4">Generate VIP Code</h1>

      <div className="input-section mb-4">
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
          onClick={handleCreateCode}
          className="w-full bg-green-500 text-white font-bold p-3 rounded-lg hover:bg-green-400"
        >
          {loading ? "Creating..." : "Create Code"}
        </button>
      </div>

      <div className="divider h-1 bg-gray-300 my-4"></div>

      <div className="code-list">
        <h2 className="text-xl font-semibold mb-4">Generated Codes:</h2>
        {codedata.length ? (
          codedata.map((code, index) => <RenderItem key={index} item={code} />)
        ) : (
          <p className="text-gray-500">No codes generated yet.</p>
        )}
      </div>

      {copied && <p className="text-green-500 mt-4">Code copied to clipboard!</p>}
    </div>
  );
};

export default GenerateComponent;
