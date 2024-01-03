import { useTheme } from 'next-themes';

import { tailwindConfig } from '@/config';
import { useMemo } from 'react';

const useDynamicColor = () => {
  const { theme } = useTheme();
  return useMemo(
    () =>
      theme === 'dark'
        ? {
            ...tailwindConfig.colors.darkmode,
            inverted: tailwindConfig.colors,
          }
        : { ...tailwindConfig.colors, inverted: tailwindConfig.colors.darkmode },
    [theme]
  );
};

export default useDynamicColor;
