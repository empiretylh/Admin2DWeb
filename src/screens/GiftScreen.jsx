import React, { useEffect, useState } from "react";
import { IMAGE } from "../config/image";
import { useNavigate } from "react-router-dom";
import { ChangePhoneNumberModal } from "./ChangePhoneNumber";
import { ChangeLiveTwoDNumber } from "./ChangeLiveTwoDNumber";
import ModalInternetModal from "./ModernInternetModal";
import { useMutation, useQuery } from "react-query";
import { getShowAd, postShowAd, sendNoti } from "../server/api";
const GiftScreen = () => {
  const [showph, setshowph] = useState(false);
  const [showlive, setshowlive] = useState(false);
  const [showmi, setshowmi] = useState(false);
  const [adtype, setadtype] = useState(false);

  const navigate = useNavigate();
  const onClickGiftScreen = (gifttype) => {
    navigate(`/gifttype/${gifttype}`);
  };

  const onClickETS = () => {
    navigate("/ets");
  };

  const postNotification = useMutation(sendNoti, {
    onSuccess: () => {
      alert("Notification Sent");
    },
  });

  const ads_data = useQuery({
    queryKey: ["ads_data"],
    queryFn: getShowAd,
  });

  const post_adsdata = useMutation({
    mutationFn: postShowAd,
    onSuccess: () => {
      ads_data?.refetch();
    },
  });

  useEffect(() => {
    if (ads_data?.data?.data) {
      console.log(ads_data?.data?.data);
      setadtype(ads_data?.data?.data);
    }
  }, [ads_data?.data]);

  return (
    <div className="min-w-screen flex flex-col  items-center justify-center ">
      <nav className="bg-green-700 p-3  w-full flex flex-row gap-2 font-mono">
        <img src={IMAGE.logo} className="w-5" />
        <h1 className="text-xl font-bold text-white">2D Admin</h1>
      </nav>
      <ChangePhoneNumberModal
        visible={showph}
        onClose={() => setshowph(false)}
      />
      <ChangeLiveTwoDNumber
        visible={showlive}
        onClose={() => setshowlive(false)}
      />
      <ModalInternetModal visible={showmi} onClose={() => setshowmi(false)} />

      <div className="flex flex-col items-center mt-4 w-[90%]">
        {/* <div className="flex flex-row gap-3 w-full">
          <button className="bg-green-700   w-full text-white text-md font-bold p-3 rounded-lg hover:bg-green-600 ">
            Add New Ad Image
          </button>
          <button className="bg-green-700  w-full text-white text-md font-bold p-3 rounded-lg hover:bg-green-600 ">
            Show Image Lists
          </button>
        </div> */}
        <button
          className="bg-green-700 text-white text-md font-bold p-3 mt-2 w-full  rounded-lg hover:bg-green-600 "
          onClick={() => {
            setshowmi(true);
          }}
        >
          Change Today Modern, Internet
        </button>
        <button
          className="bg-green-700 text-white text-md font-bold p-3 mt-2 w-full  rounded-lg hover:bg-green-600 "
          onClick={() => {
            setshowlive(true);
          }}
        >
          Change Live 2D Number
        </button>

        <button
          className="bg-green-700 text-white text-md font-bold p-3 mt-2 w-full  rounded-lg hover:bg-green-600 "
          onClick={() => {
            postNotification.mutate({
              title: "Test Notification",
              message: "This is Test Notification",
            });
          }}
        >
          Send Notification
        </button>

        <div className="flex flex-row gap-3 mt-2 w-full">
          <button
            className="bg-green-700 w-full text-white text-md font-bold p-3 rounded-lg hover:bg-green-600 "
            onClick={() => {
              navigate("/vipcode");
            }}
          >
            VIP Code Generator
          </button>
          <button
            className="bg-green-700 w-full text-white text-md font-bold p-3 rounded-lg hover:bg-green-600 "
            onClick={() => {
              setshowph(true);
            }}
          >
            Change Phone Number
          </button>
        </div>

        <div className="flex flex-col gap-3 mt-2 w-full bg-green-500 p-5 rounded-lg">
          <h1 class="text-white font-bold text-xl">တစ်ရက်စာ</h1>
          <button
            className="bg-green-700 w-full text-white text-md font-bold p-3 rounded-lg hover:bg-green-600 "
            onClick={() => onClickETS()}
          >
            Estimate Thai Stock
          </button>
          <button
            className="bg-green-700 w-full text-white text-md font-bold p-3 rounded-lg hover:bg-green-600 "
            onClick={() => onClickGiftScreen("oneday")}
          >
            တစ်ရက်စာ ရွှေလက်ဆောင်
          </button>
        </div>

        <div className="flex flex-col gap-3 mt-2 w-full bg-green-500 p-5 rounded-lg">
          <h1 className="text-white font-bold text-xl">တစ်ပတ်စာ</h1>
          <button
            className="bg-green-700 w-full text-white text-md font-bold p-3 rounded-lg hover:bg-green-600 "
            onClick={() => onClickGiftScreen("oneweek")}
          >
            တစ်ပတ်စာ လက်ဆောင်
          </button>
          <button
            className="bg-green-700 w-full text-white text-md font-bold p-3 rounded-lg hover:bg-green-600"
            onClick={() => onClickGiftScreen("threedgift")}
          >
            3D ရွှေလက်ဆောင်
          </button>
          <button
            className="bg-green-700 w-full text-white text-md font-bold p-3 rounded-lg hover:bg-green-600 "
            onClick={() => onClickGiftScreen("vipgift")}
          >
            💎 VIP GIFT 💎
          </button>
        </div>

        {/* show ad type button  */}
        {/* noad, fbad, admob, ironsouse */}
        <div className="flex flex-col  mt-2 w-full bg-green-500 p-5 rounded-lg">
          <h1 className="text-white font-bold text-xl">Show Ad Type</h1>

          <div className="flex flex-row gap-3 mt-1">
            <button
              className={`bg-green-700 w-full text-white ${
                adtype == "NoAd" ? "bg-red-500" : ""
              } text-md font-bold p-3 rounded-lg hover:bg-green-600 `}
              onClick={() => {
                post_adsdata.mutate({
                  ad_type: "NoAd",
                });
              }}
            >
              No Ad
            </button>
            <button
              className={`bg-green-700 w-full text-white text-md  ${
                adtype == "Facebook" ? "bg-red-500" : ""
              }  font-bold p-3 rounded-lg hover:bg-green-600 `}
              onClick={() => {
                post_adsdata.mutate({
                  ad_type: "Facebook",
                });
              }}
            >
              FB Ad
            </button>
            <button
              className={`bg-green-700 w-full text-white text-md  ${
                adtype == "AdMob" ? "bg-red-500" : ""
              }  font-bold p-3 rounded-lg hover:bg-green-600 `}
              onClick={() => {
                post_adsdata.mutate({
                  ad_type: "AdMob",
                });
              }}
            >
              Admob Ad
            </button>
            <button
              className={`bg-green-700 w-full text-white text-md  ${
                adtype == "IronSource" ? "bg-red-500" : ""
              }  font-bold p-3 rounded-lg hover:bg-green-600 `}
              onClick={() => {
                post_adsdata.mutate({
                  ad_type: "IronSource",
                });
              }}
            >
              IS Ad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftScreen;
