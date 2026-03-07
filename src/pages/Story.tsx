import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Section, PageHeader, FadeIn } from '../components/ui';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TimelineBlock } from '../components/shared/TimelineBlock';

export default function Story() {
  const timelineBlocks = [
    {
      year: "2018",
      image: "https://brkfoundation.org/theme/brk/img/story2018.jpg",
      title: "The Beginning",
      events: [
        { date: "September 3rd", desc: "Provided relief items (funds and supplies) for landslide victims in Naga City." }
      ]
    },
    {
      year: "2020",
      image: "https://brkfoundation.org/theme/brk/img/story2020.jpg",
      title: "Expanding Reach",
      events: [
        { date: "August 20th", desc: "Supported a computer donation drive for a prison facility in Cebu City." }
      ]
    },
    {
      year: "2021",
      image: "https://brkfoundation.org/theme/brk/img/story2021.jpg",
      title: "Crisis Response",
      events: [
        { date: "December 1st", desc: "Provided meals and relief items for victims of a fire in Mambaling, Cebu City." }
      ]
    },
    {
      year: "2022",
      image: "https://brkfoundation.org/theme/brk/img/story20221.jpg",
      title: "Community Support",
      events: [
        { date: "April 2nd", desc: "Supported the creation of a rest area for a police station in Mandaue City." },
        { date: "May 25th", desc: "Provided clothing and footwear for people in need in Quito Pardo, Cebu City." },
        { date: "May 27th", desc: "Provided clothing and footwear for people in need in Bulacao Pardo, Cebu City." }
      ]
    },
    {
      year: "2022",
      image: "https://brkfoundation.org/theme/brk/img/story20222.jpg",
      title: "Foundation Establishment",
      events: [
        { date: "July 7th", desc: "Provided fans for people in need in Punta, Cebu City." },
        { date: "July 14th", desc: "Provided fans for people in need in Quito Pardo, Cebu City." },
        { date: "August 15th", desc: "Official establishment of the BRK Foundation." }
      ]
    },
    {
      year: "2020 ~ Present",
      image: "https://brkfoundation.org/theme/brk/img/story20223.jpg",
      title: "Pandemic Response",
      events: [
        { date: "July 18th", desc: "Ongoing rice noodle feeding program for civilians in Cebu City, starting from checkpoints manned by military personnel during the COVID-19 pandemic." }
      ]
    }
  ];

  return (
    <MainLayout>
      <PageHeader 
        title="Our Journey" 
        subtitle="From humble beginnings to a registered foundation, tracing our path of service and impact."
        image="https://brkfoundation.org/theme/brk/img/s_back02.jpg"
      />

      <Section bg="white" className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
            {/* Intro Text */}
            <div className="text-center mb-24 max-w-3xl mx-auto">
                <FadeIn>
                    <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900 mb-6">
                        A History of <span className="text-primary">Helping Hands</span>
                    </h2>
                    <p className="text-lg text-gray-600 font-medium leading-relaxed">
                        What started as a small initiative to help landslide victims has grown into a dedicated foundation committed to uplifting communities across Cebu. Here is our story.
                    </p>
                </FadeIn>
            </div>

            {/* Timeline */}
            <div className="relative">
                {/* Central Line (Desktop & Mobile) */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent -translate-x-1/2" />

                <div className="space-y-24 md:space-y-24 mt-10">
                    {timelineBlocks.map((block, idx) => (
                        <TimelineBlock 
                          key={idx}
                          year={block.year}
                          image={block.image}
                          title={block.title}
                          events={block.events}
                          isEven={idx % 2 === 0}
                        />
                    ))}
                </div>
            </div>

            {/* Future / CTA */}
            <div className="mt-16 text-center">
                <FadeIn delay={0.1} viewport={{ once: true, margin: "0px" }}>
                    <div className="bg-dark text-white rounded-3xl p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
                        
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h3 className="text-3xl font-display font-bold mb-6">The Journey Continues</h3>
                            <p className="text-white/80 text-lg mb-8 leading-relaxed">
                                We are just getting started. Join us as we continue to write new chapters of hope and service for the communities that need it most.
                            </p>
                            <Link to="/contact" className="bg-white text-dark font-bold py-4 px-8 rounded-full hover:bg-primary hover:text-white transition-all duration-300 inline-flex items-center gap-2 group">
                                Support Our Mission
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
      </Section>
    </MainLayout>
  );
}

