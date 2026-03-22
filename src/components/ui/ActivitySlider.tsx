import React from 'react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

interface Activity {
  title: string;
  date: string;
  image: string;
  slug?: string;
  type?: string;
}

interface ActivitySliderProps {
  activities: Activity[];
}

export const ActivitySlider: React.FC<ActivitySliderProps> = ({ activities }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: activities.length > 3,
      align: 'start',
      skipSnaps: false,
      dragFree: true
    },
    [
      AutoScroll({
        speed: 1.5,
        startDelay: 0,
        stopOnInteraction: false,
        stopOnMouseEnter: true
      })
    ]
  );

  const [scrollProgress, setScrollProgress] = React.useState(0);

  const onScroll = React.useCallback((api: any) => {
    const progress = Math.max(0, Math.min(1, api.scrollProgress()));
    setScrollProgress(progress * 100);
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    onScroll(emblaApi);
    emblaApi.on('reInit', onScroll);
    emblaApi.on('scroll', onScroll);

    return () => {
      emblaApi.off('reInit', onScroll);
      emblaApi.off('scroll', onScroll);
    };
  }, [emblaApi, onScroll]);

  return (
    <div className="relative max-w-full px-4 md:px-0 cursor-grab active:cursor-grabbing select-none">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y py-8 -ml-6">
          {activities.map((item, idx) => (
            <div
              key={idx}
              className="flex-[0_0_70%] md:flex-[0_0_35%] lg:flex-[0_0_22%] min-w-0 pl-6"
            >
              {item.slug ? (
                <Link to={`/${item.type === 'news' ? 'news' : 'gallery'}/${item.slug}`} className="block bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] h-full group pb-2 transition-all hover:-translate-y-1">
                  <div className="relative overflow-hidden aspect-square">        
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/60" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      <h3 className="text-2xl font-display font-bold mb-4 leading-tight">{item.title}</h3>
                      <p className="text-sm font-medium opacity-80 uppercase tracking-wider">{item.date}</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] h-full group">
                  <div className="relative overflow-hidden aspect-square">        
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/60" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      <h3 className="text-2xl font-display font-bold mb-4 leading-tight">{item.title}</h3>
                      <p className="text-sm font-medium opacity-80 uppercase tracking-wider">{item.date}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Progress Indicator */}
      <div className="mt-2 px-2 md:px-0 max-w-xs mx-auto">
        <div className="relative h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute top-0 bottom-0 bg-black rounded-full w-[25%]"   
            style={{
              transform: `translate3d(${scrollProgress * 3}%, 0, 0)`,
              willChange: 'transform'
            }}
          />
        </div>
      </div>
    </div>
  );
};
