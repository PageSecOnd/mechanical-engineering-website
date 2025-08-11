'use client';

import React, { useEffect } from 'react';
import { HeroCarousel } from '@/components/sections/HeroCarousel';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { NewsSection } from '@/components/sections/NewsSection';
import { useSiteStore } from '@/store/siteStore';

export default function HomePage() {
  const { settings, fetchSettings } = useSiteStore();

  useEffect(() => {
    fetchSettings().catch(console.error);
  }, [fetchSettings]);

  return (
    <div>
      {/* Hero section with carousel */}
      <HeroCarousel images={settings?.carouselImages || []} />
      
      {/* About section */}
      <AboutSection />
      
      {/* Featured products section */}
      <ProductsSection />
      
      {/* Latest news section */}
      <NewsSection />
    </div>
  );
}