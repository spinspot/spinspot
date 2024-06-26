// Layout component que contiene los SVGs
export function LayoutWaves({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-dvh">
      {/* SVGs para pantallas pequeñas */}
      <div className="absolute inset-0 sm:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 411 168"
          fill="none"
          className="text-primary absolute bottom-[-35px] left-0"
        >
          <path
            d="M458.043 349.5C457.765 353.356 454.414 356.256 450.558 355.978L-97.0221 316.52C-100.878 316.243 -103.779 312.891 -103.501 309.035L-81.9342 9.74318C-81.6523 5.83188 -76.0952 5.36212 -75.1608 9.17063C-52.461 101.694 54.6555 144.268 134.676 92.5706L219.762 37.6008C297.218 -6.64413 391.09 -11.45 472.659 24.6533L480.684 28.2052C480.981 28.3368 481.164 28.6409 481.14 28.9653L458.043 349.5Z"
            fill="currentColor"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 411 446"
          fill="none"
          className="text-neutral absolute left-0 top-[-85px] flex-shrink-0"
        >
          <path
            d="M45.71 -173.938C47.643 -177.286 51.9242 -178.433 55.2722 -176.5L592.561 133.704C595.909 135.637 597.057 139.918 595.124 143.266L421.494 444.002C419.273 447.849 413.378 445.557 414.338 441.22C437.848 335.047 348.555 237.861 240.775 252.314L129.397 267.25C28.6934 275.151 -69.5903 233.734 -134.268 156.142L-140.146 149.089C-140.375 148.815 -140.408 148.428 -140.229 148.119L45.71 -173.938Z"
            fill="currentColor"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 411 211"
          fill="none"
          className="text-primary absolute left-0 top-[-60px]"
        >
          <path
            d="M-118.859 -131.557C-118.859 -135.422 -115.725 -138.557 -111.859 -138.557H437.141C441.007 -138.557 444.141 -135.423 444.141 -131.557V168.512C444.141 172.433 438.632 173.301 437.427 169.57C408.136 78.917 298.236 44.1522 222.138 101.467L141.223 162.41C67.1476 212.107 -26.1359 223.648 -110.089 193.5L-118.348 190.534C-118.655 190.424 -118.859 190.134 -118.859 189.809V-131.557Z"
            fill="currentColor"
          />
        </svg>
      </div>
      {/* SVGs para pantallas grandes */}
      <div className="absolute inset-0 hidden sm:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1280 228"
          fill="none"
          className="text-primary absolute bottom-[-65px] left-0"
        >
          <path
            d="M1276.01 407.441C1275.73 411.297 1272.38 414.197 1268.52 413.92L-97.0175 315.52C-100.874 315.242 -103.774 311.891 -103.496 308.035L-81.803 6.98607C-81.3264 0.372895 -72.778 -1.93352 -69.0398 3.54249L-40.563 45.2569C24.8608 141.093 142.311 187.071 255.41 161.119L659.865 68.3136V68.3136C853.989 30.04 1053.93 32.2812 1247.14 74.8966L1295.49 85.5603C1297.59 86.0229 1299.03 87.9539 1298.88 90.0959L1276.01 407.441Z"
            fill="currentColor"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1280 603"
          fill="none"
          className="text-neutral absolute left-0 top-[-95px]"
        >
          <path
            d="M-73.6418 -471.306C-72.5115 -475.003 -68.5981 -477.084 -64.9011 -475.953L1503.32 3.50013C1507.02 4.63043 1509.1 8.54379 1507.97 12.2409L1329.09 597.317C1326.92 604.437 1316.6 603.686 1315.48 596.325L1295.48 465.159C1271.65 308.942 1124.13 202.79 968.437 229.834L485.268 313.76V313.76C241.196 344.923 -6.30291 293.904 -218.153 168.757L-259.315 144.441C-260.597 143.684 -261.193 142.147 -260.758 140.724L-73.6418 -471.306Z"
            fill="currentColor"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1280 255"
          fill="none"
          className="text-primary absolute left-0 top-[-85px]"
        >
          <path
            d="M-96.9998 -182C-96.9998 -185.866 -93.8657 -189 -89.9998 -189H1310C1313.87 -189 1317 -185.866 1317 -182V202.616C1317 209.603 1307.89 212.278 1304.11 206.399L1273.35 158.517C1201.35 46.4508 1060.76 0.0433933 936.198 47.2278L556.207 191.168V191.168C362.13 256.654 154.627 271.907 -46.939 235.503L-94.0277 226.999C-95.7483 226.688 -96.9998 225.191 -96.9998 223.442V-182Z"
            fill="currentColor"
          />
        </svg>
      </div>
      {/* Children */}
      <div className="relative my-auto flex w-full flex-col items-center">
        <main className="mt-14 w-full max-w-md space-y-4 rounded-lg py-8 sm:mt-32">
          {children}
        </main>
      </div>
    </div>
  );
}
