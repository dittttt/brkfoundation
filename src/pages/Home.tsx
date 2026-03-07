import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { HeroSection } from '../components/home/HeroSection';
import { IntroSection } from '../components/home/IntroSection';
import { ImpactStats } from '../components/home/ImpactStats';
import { RecentActivities } from '../components/home/RecentActivities';
import { PartnersSection } from '../components/home/PartnersSection';

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <IntroSection />
      <ImpactStats />
      <RecentActivities />
      <PartnersSection />
    </MainLayout>
  );
}

