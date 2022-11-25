import React from "react";
import { Link } from "react-router-dom";
import { User } from "./types";
import { getUserDetails } from "components/App";

export const Contenter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className=" m-9  
            grid h-96 w-96 place-items-center
            rounded-lg border border-slate-300 shadow-md transition
            ease-in "
    >
      {children}
    </div>
  );
};
// play menu
export const Menu = (): React.ReactElement => {
	const  userDetails: User = getUserDetails();
	const link = "/Profile/" + userDetails.username;

  return (
    <>
      <div className="overflow-y-scroll scrollbar-hide h-fit max-h-screen m-auto pt-[50px]">
        <div className="  flex  flex-wrap justify-center">
          <Contenter>
            <Link to="/Watch" className="h-full w-full">
              <div className="mt-32 flex justify-center">
                <Watch />
              </div>
            </Link>
          </Contenter>
          <Contenter>
            <Link to={link} className="relative h-full w-full">
              <div className="mt-32 flex justify-center">
                <UserSVG />
              </div>
            </Link>
          </Contenter>
          <Contenter>
            <Link to="/Chat" className="relative h-full w-full">
              <div className="mt-32 flex justify-center">
                <ChatSVG />
              </div>
            </Link>
          </Contenter>
        </div>
        <div className=" flex w-screen flex-wrap justify-center">
          <ContenterLarge>
            <Link to="/PlayMenu" className="relative h-full w-full">
              <div className="mt-32 flex justify-center">
                <StartSVG />
              </div>
            </Link>
          </ContenterLarge>
          <ContenterLarge>
            <Link to="/CreateGame" className="relative h-full w-full">
              <div className="mt-32 flex justify-center">
                <SettingSvg />
              </div>
            </Link>
          </ContenterLarge>
        </div>
      </div>
,


    </>
  );
};

const UserSVG = () => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 1000 1000"
      fill="rgb(100,116,137)"
      height={150}
      width={150}
      enableBackground="new 0 0 1000 1000"
      xmlSpace="preserve"
    >
      <g>
        <g>
          <path d="M911,783.7l-3.3,4C799,918.1,654.2,990,500,990c-154.2,0-299-71.9-407.7-202.3l-3.3-4l0.8-5.1c21-137,92.6-247,201.5-309.9l7.7-4.5l6.2,6.5c51.4,54,120.6,83.7,194.8,83.7s143.4-29.7,194.8-83.7l6.2-6.5l7.7,4.5c108.9,62.9,180.5,172.9,201.5,309.9L911,783.7z M500,499.4c134.9,0,244.7-109.8,244.7-244.7S634.9,10,500,10S255.3,119.8,255.3,254.7S365.1,499.4,500,499.4z" />
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </g>
    </svg>
  );
};

const Watch = () => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="100.000000pt"
      height="100.000000pt"
      fill="rgb(100,116,137)"
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        stroke="none"
      >
        <path
          d="M2492 5109 c-46 -14 -109 -80 -122 -128 -7 -28 -10 -186 -8 -484 l3
-442 24 -38 c13 -21 42 -50 64 -65 34 -23 52 -27 107 -27 55 0 73 4 107 27 22
15 51 44 64 65 l24 38 0 465 0 465 -24 38 c-47 76 -151 113 -239 86z"
        />
        <path
          d="M1220 4838 c-84 -24 -143 -103 -142 -193 0 -42 25 -105 163 -415 89
-201 170 -377 181 -392 29 -42 82 -69 146 -75 47 -4 65 -1 102 19 62 34 102
93 108 161 4 53 -2 68 -164 433 -185 417 -199 440 -287 463 -53 13 -60 13
-107 -1z"
        />
        <path
          d="M3787 4838 c-81 -22 -100 -52 -281 -462 -162 -365 -168 -380 -164
-433 6 -68 46 -127 108 -161 80 -42 198 -16 248 56 11 15 92 191 181 392 141
317 162 372 162 416 0 93 -57 169 -146 193 -46 13 -56 13 -108 -1z"
        />
        <path
          d="M115 4047 c-21 -12 -53 -42 -70 -65 -26 -38 -30 -52 -30 -105 1 -38
7 -74 18 -94 19 -35 489 -463 534 -486 79 -41 164 -27 229 38 71 72 80 172 22
254 -34 47 -488 452 -525 467 -50 22 -131 17 -178 -9z"
        />
        <path
          d="M4825 4056 c-45 -20 -507 -439 -532 -483 -49 -85 -38 -172 32 -239
71 -69 168 -79 246 -27 60 40 500 446 516 476 11 20 17 55 18 94 0 53 -4 67
-30 105 -42 59 -96 88 -165 87 -30 0 -68 -6 -85 -13z"
        />
        <path
          d="M2375 3514 c-22 -2 -89 -11 -150 -20 -854 -118 -1683 -719 -2162
-1566 -54 -96 -58 -107 -58 -168 0 -62 3 -70 69 -185 393 -685 1000 -1202
1692 -1438 282 -97 491 -131 794 -131 249 -1 370 14 605 74 744 189 1476 775
1896 1520 50 88 54 100 54 160 0 62 -3 70 -68 183 -242 423 -564 781 -947
1054 -371 265 -786 437 -1200 498 -101 15 -443 27 -525 19z m525 -423 c483
-85 913 -321 1305 -715 160 -160 278 -304 402 -488 l86 -128 -86 -127 c-125
-187 -243 -330 -402 -488 -312 -313 -633 -518 -1001 -640 -390 -129 -814 -137
-1208 -24 -569 163 -1091 568 -1483 1152 l-86 127 86 128 c233 346 533 650
845 856 309 203 679 337 1022 370 108 10 408 -3 520 -23z"
        />
        <path
          d="M2360 2721 c-381 -81 -682 -383 -761 -765 -125 -604 342 -1176 961
-1176 271 0 517 106 705 301 181 189 275 420 275 679 0 331 -166 638 -444 821
-211 139 -488 192 -736 140z m322 -392 c29 -6 91 -29 137 -51 195 -93 321
-296 321 -518 0 -96 -16 -162 -61 -257 -94 -196 -297 -323 -519 -323 -97 0
-162 16 -259 62 -195 93 -321 296 -321 518 0 97 16 162 62 259 71 149 218 267
380 307 67 16 191 17 260 3z"
        />
      </g>
    </svg>
  );
};

const StartSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="root"
      version="1.1"
      width="100"
      fill="rgb(100,116,137)"
      height="100"
      viewBox="0 0 12 12"
    >
      <path
        stroke="rgb(100,116,137)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M 11 6 L 2 1 v 10 z"
      />
    </svg>
  );
};

const ChatSVG = (): React.ReactElement => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="100.000000pt"
      height="100.000000pt"
      fill="rgb(100, 116, 137)"
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        stroke="none"
      >
        <path
          d="M2295 4979 c-650 -65 -1214 -327 -1647 -766 -732 -739 -855 -1809
-308 -2668 72 -113 70 -99 44 -295 -53 -414 -172 -756 -326 -938 -68 -79 -74
-117 -25 -162 27 -26 48 -25 214 5 409 76 839 213 1149 367 l121 60 119 -42
c142 -50 357 -103 509 -125 232 -34 575 -36 800 -5 752 106 1417 508 1811
1097 85 126 213 388 259 528 218 667 88 1395 -352 1962 -397 512 -1005 861
-1678 962 -201 31 -501 39 -690 20z m-787 -1984 c165 -75 241 -279 167 -443
-95 -211 -364 -269 -535 -115 -202 182 -118 516 147 583 60 15 158 4 221 -25z
m1135 20 c100 -26 187 -99 231 -194 32 -71 30 -197 -6 -273 -31 -68 -95 -133
-164 -168 -42 -21 -62 -25 -144 -25 -82 0 -102 4 -144 25 -69 35 -133 100
-164 168 -36 76 -38 202 -6 273 43 93 131 168 227 194 68 18 101 18 170 0z
m1252 -19 c221 -101 266 -397 85 -559 -132 -119 -328 -117 -456 5 -194 183
-113 502 145 575 64 18 161 9 226 -21z"
        />
      </g>
    </svg>
  );
};
const SettingSvg = (): React.ReactElement => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="100.000000pt"
      fill="rgb(100,116,137)"
      height="100.000000pt"
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        stroke="none"
      >
        <path
          d="M2051 4847 c-56 -28 -62 -49 -107 -369 -24 -167 -44 -307 -44 -313 0
-5 -42 -30 -92 -55 -51 -25 -139 -76 -197 -114 l-104 -69 -291 117 c-312 124
-346 133 -391 94 -41 -37 -505 -847 -505 -883 0 -16 8 -43 18 -58 9 -15 127
-114 262 -220 l245 -192 -5 -60 c-7 -79 -4 -304 3 -353 l7 -39 -255 -198
c-264 -206 -283 -225 -272 -288 6 -37 456 -818 495 -859 49 -53 61 -50 390 81
l302 121 76 -55 c42 -30 130 -82 195 -115 66 -34 119 -64 119 -69 0 -4 20
-146 44 -316 44 -307 45 -308 75 -339 l31 -31 498 -3 c382 -1 503 1 521 10 55
29 60 48 108 379 24 173 45 315 46 315 1 1 47 24 102 52 56 28 143 78 194 113
l94 62 291 -117 c321 -129 349 -135 394 -88 44 44 502 844 502 876 0 15 -6 39
-14 54 -8 15 -127 115 -265 222 l-251 195 7 45 c9 57 9 301 -1 360 l-6 45 254
198 c139 109 259 210 265 223 20 45 12 78 -49 184 -250 439 -429 736 -453 754
-18 13 -41 20 -65 19 -21 -1 -162 -52 -324 -117 l-287 -116 -75 54 c-42 30
-130 82 -196 115 -66 34 -120 63 -120 65 0 1 -20 141 -44 311 -47 325 -53 344
-107 372 -18 10 -144 13 -509 13 -365 0 -491 -3 -509 -13z m652 -1501 c168
-32 314 -113 434 -239 83 -87 134 -169 173 -274 128 -352 -2 -738 -317 -943
-136 -89 -259 -125 -433 -125 -174 0 -297 36 -433 125 -174 113 -286 271 -345
485 -23 85 -22 287 2 380 105 407 512 669 919 591z"
        />
      </g>
    </svg>
  );
};

function ContenterLarge({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className="  m-9  
            grid h-96 w-96 place-items-center rounded-lg border border-slate-300
            shadow-md transition ease-in 
            md:w-96 lg:w-1/3"
    >
      {children}
    </div>
  );
}