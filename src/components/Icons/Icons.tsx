const Icons = () => {
  return (
    <div>
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <symbol id="icon-error" viewBox="0 0 32 32">
            <path
              fill="#d75a4a"
              d="M32 16c0 8.837-7.163 16-16 16s-16-7.163-16-16c0-8.837 7.163-16 16-16s16 7.163 16 16z"
            ></path>
            <path
              fill="none"
              stroke="#fff"
              strokeLinejoin="miter"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="1.28"
              d="M10.24 21.76l11.52-11.52"
            ></path>
            <path
              fill="none"
              stroke="#fff"
              strokeLinejoin="miter"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="1.28"
              d="M10.24 10.24l11.52 11.52"
            ></path>
          </symbol>
          <symbol id="icon-success" viewBox="0 0 32 32">
            <path
              fill="#25ae88"
              d="M32 16c0 8.837-7.163 16-16 16s-16-7.163-16-16c0-8.837 7.163-16 16-16s16 7.163 16 16z"
            ></path>
            <path
              fill="none"
              stroke="#fff"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="1.28"
              d="M24.32 9.6l-10.24 11.52-6.4-5.12"
            ></path>
          </symbol>
          <symbol id="icon-cross" viewBox="0 0 32 32">
            <path
              fill="currentColor"
              d="M29.835 0l-13.835 13.882-13.835-13.882-2.119 2.112 13.842 13.888-13.842 13.889 2.119 2.111 13.835-13.881 13.835 13.881 2.119-2.111-13.842-13.889 13.842-13.888z"
            ></path>
          </symbol>
        </defs>
      </svg>
    </div>
  );
};

export default Icons;
