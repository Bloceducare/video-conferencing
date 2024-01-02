import React from 'react';
import Link from 'next/link';
import { Button } from '@/types';
import { getListPage } from '@/lib/contentParser';

const HomepageButton = () => {
  const homepage = getListPage('_index.md');
  const { frontmatter } = homepage;
  const {
    banner,
  }: {
    banner: {
      title: string;
      image: string;
      content?: string;
      button_black?: Button;
      button_white?: Button;
    };
  } = frontmatter;
  return (
    <div>
      <span className="flex justify-center gap-1">
        {' '}
        {banner.button_white?.enable && (
          <button className="btn btn-outline">
            <Link legacyBehavior href={banner.button_white.link}>
              {banner.button_white.label}
            </Link>
          </button>
        )}
        {banner.button_black?.enable && (
          <button className="btn btn-outline">
            <Link legacyBehavior href={banner.button_black.link}>
              {banner.button_black.label}
            </Link>
          </button>
        )}
      </span>
    </div>
  );
};

export default HomepageButton;
