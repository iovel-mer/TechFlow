import type React from 'react';

// USDT Icon - Default brand colors (green background with white text)
interface UsdtIconProps {
  className?: string;
}

export const UsdtIcon: React.FC<UsdtIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      id='Layer_1'
      data-name='Layer 1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 339.43 295.27'
    >
      <path
        d='M62.15,1.45l-61.89,130a2.52,2.52,0,0,0,.54,2.94L167.95,294.56a2.55,2.55,0,0,0,3.53,0L338.63,134.4a2.52,2.52,0,0,0,.54-2.94l-61.89-130A2.5,2.5,0,0,0,275,0H64.45a2.5,2.5,0,0,0-2.3,1.45h0Z'
        fill='#26A17B'
      />
      <path
        d='M191.19,144.8v0c-1.2.09-7.4,0.46-21.23,0.46-11,0-18.81-.33-21.55-0.46v0c-42.51-1.87-74.24-9.27-74.24-18.13s31.73-16.25,74.24-18.15v28.91c2.78,0.2,10.74.67,21.74,0.67,13.2,0,19.81-.55,21-0.66v-28.9c42.42,1.89,74.08,9.29,74.08,18.13s-31.65,16.24-74.08,18.12h0Zm0-39.25V79.68h59.2V40.23H89.21V79.68H148.4v25.86c-48.11,2.21-84.29,11.74-84.29,23.16s36.18,20.94,84.29,23.16v82.9h42.78V151.83c48-2.21,84.12-11.73,84.12-23.14s-36.09-20.93-84.12-23.15h0Zm0,0h0Z'
        fill='white'
      />
    </svg>
  );
};

// XRP Icon - White
interface XrpIconProps {
  className?: string;
}

export const XrpIcon: React.FC<XrpIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 424'
    >
      <g id='Layer_2' data-name='Layer 2'>
        <g id='Layer_1-2' data-name='Layer 1'>
          <path
            d='M437,0h74L357,152.48c-55.77,55.19-146.19,55.19-202,0L.94,0H75L192,115.83a91.11,91.11,0,0,0,127.91,0Z'
            fill='white'
          />
          <path
            d='M74.05,424H0L155,270.58c55.77-55.19,146.19-55.19,202,0L512,424H438L320,307.23a91.11,91.11,0,0,0-127.91,0Z'
            fill='white'
          />
        </g>
      </g>
    </svg>
  );
};

// ETH Icon - White
interface EthIconProps {
  className?: string;
}

export const EthIcon: React.FC<EthIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12 2L5.5 12.5L12 16L18.5 12.5L12 2Z' fill='white' />
      <path
        d='M12 17L5.5 13.5L12 22L18.5 13.5L12 17Z'
        fill='white'
        opacity='0.8'
      />
    </svg>
  );
};

// BNB Icon - White
interface BnbIconProps {
  className?: string;
}

export const BnbIcon: React.FC<BnbIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12 2L8 6L12 10L16 6L12 2Z' fill='white' />
      <path d='M2 12L6 8L10 12L6 16L2 12Z' fill='white' />
      <path d='M14 12L18 8L22 12L18 16L14 12Z' fill='white' />
      <path d='M12 14L8 18L12 22L16 18L12 14Z' fill='white' />
    </svg>
  );
};

// USDC Icon - White
interface UsdcIconProps {
  className?: string;
}

export const UsdcIcon: React.FC<UsdcIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='12' cy='12' r='10' fill='white' />
      <path
        d='M12 6C15.3 6 18 8.7 18 12C18 15.3 15.3 18 12 18C8.7 18 6 15.3 6 12C6 8.7 8.7 6 12 6Z'
        fill='#2775CA'
      />
      <text
        x='12'
        y='16'
        textAnchor='middle'
        fill='white'
        fontSize='6'
        fontWeight='bold'
        fontFamily='Arial, sans-serif'
      >
        USD
      </text>
    </svg>
  );
};
