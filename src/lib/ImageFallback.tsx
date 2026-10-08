// src/lib/ImageFallback.tsx
"use client"
import React, { ImgHTMLAttributes } from 'react';

type Props = ImgHTMLAttributes<HTMLImageElement>;

export const ImageFallback: React.FC<Props> = ({ src, ...rest }) => {
  const fallback = '/images/placeholder.svg';
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.currentTarget as HTMLImageElement).src = fallback;
  };
  return <img src={src} onError={handleError} {...rest} />;
};
