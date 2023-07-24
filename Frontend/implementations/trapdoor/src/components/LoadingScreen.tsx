import React, { useEffect } from 'react';
import LazyLoadingImage, { LazyLoadingImageProperties, SrcSetObject } from './LazyLoadingImage';

interface LoadingScreenProperties {
}

const images: LazyLoadingImageProperties[] = [
  {
    alt: 'Claire Metahuman wearing a dress in Stage',
    srcset: [
      {
        src: require('../assets/images/loading-screen/optimized-images/Claire_HalterDress_ModernBuildings_fullbody_720p.png'),
        width: 1280,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/Claire_HalterDress_ModernBuildings_fullbody_1080p.png'),
        width: 1920,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/Claire_HalterDress_ModernBuildings_fullbody_1440p.png'),
        width: 2560,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/Claire_HalterDress_ModernBuildings_fullbody_4k.png'),
        width: 3840,
      }
    ]
  },
  {
    alt: 'North Face Backpack rendereed in Stage',
    srcset: [
      {
        src: require('../assets/images/loading-screen/optimized-images/NorthFace_BP_07_720p.png'),
        width: 1280,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/NorthFace_BP_07_1080p.png'),
        width: 1920,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/NorthFace_BP_07_1440p.png'),
        width: 2560,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/NorthFace_BP_07_4k.png'),
        width: 3840,
      }
    ]
  },
  {
    alt: 'Close up of a boombox rendered in Stage',
    srcset: [
      {
        src: require('../assets/images/loading-screen/optimized-images/CloseUpBoomBox_2_720p.png'),
        width: 1280,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/CloseUpBoomBox_2_1080p.png'),
        width: 1920,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/CloseUpBoomBox_2_1440p.png'),
        width: 2560,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/CloseUpBoomBox_2_4k.png'),
        width: 3840,
      }
    ]
  },
  {
    alt: 'Delilah Metahuman wearing leggings on a tennis court in Stage',
    srcset: [
      {
        src: require('../assets/images/loading-screen/optimized-images/Delilah_leggings_TennisCourt_closeup_720p.png'),
        width: 1280,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/Delilah_leggings_TennisCourt_closeup_1080p.png'),
        width: 1920,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/Delilah_leggings_TennisCourt_closeup_1440p.png'),
        width: 2560,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/Delilah_leggings_TennisCourt_closeup_4k.png'),
        width: 3840,
      }
    ]
  },
  {
    alt: 'Motorcycle rendered in Stage',
    srcset: [
      {
        src: require('../assets/images/loading-screen/optimized-images/FullMotorcycle_5_720p.png'),
        width: 1280,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/FullMotorcycle_5_1080p.png'),
        width: 1920,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/FullMotorcycle_5_1440p.png'),
        width: 2560,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/FullMotorcycle_5_4k.png'),
        width: 3840,
      }
    ]
  },
  {
    alt: 'Roman Ruins scene rendered in Stage',
    srcset: [
      {
        src: require('../assets/images/loading-screen/optimized-images/RomanRuins_scene_720p.png'),
        width: 1280,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/RomanRuins_scene_1080p.png'),
        width: 1920,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/RomanRuins_scene_1440p.png'),
        width: 2560,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/RomanRuins_scene_4k.png'),
        width: 3840,
      }
    ]
  },
  {
    alt : 'Another Motorcycle rendered in Stage',
    srcset: [
      {
        src: require('../assets/images/loading-screen/optimized-images/FullMotorcycle_8_720p.png'),
        width: 1280,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/FullMotorcycle_8_1080p.png'),
        width: 1920,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/FullMotorcycle_8_1440p.png'),
        width: 2560,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/FullMotorcycle_8_4k.png'),
        width: 3840,
      }
    ]
  },
  {
    alt: 'Utah Canyon scene rendered in Stage',
    srcset: [
      {
        src: require('../assets/images/loading-screen/optimized-images/UtahCanyon_scene_720p.png'),
        width: 1280,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/UtahCanyon_scene_1080p.png'),
        width: 1920,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/UtahCanyon_scene_1440p.png'),
        width: 2560,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/UtahCanyon_scene_4k.png'),
        width: 3840,
      }
    ]
  },
  {
    alt: 'Knit Dress on a mannequin rendered in Stage',
    srcset: [
      {
        src: require('../assets/images/loading-screen/optimized-images/Wallpaper_KnitDress_Quarry_720p.png'),
        width: 1280,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/Wallpaper_KnitDress_Quarry_1080p.png'),
        width: 1920,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/Wallpaper_KnitDress_Quarry_1440p.png'),
        width: 2560,
      },
      {
        src: require('../assets/images/loading-screen/optimized-images/Wallpaper_KnitDress_Quarry_4k.png'),
        width: 3840,
      }
    ]
  }
]

const LoadingScreen = ({

}: LoadingScreenProperties) => {

  const [currentImage, setCurrentImage] = React.useState(0);
  const changeImage = () => {
    setCurrentImage(oldVal => {
      if (oldVal === images.length - 1) {
        return 0;
      }
      else return oldVal + 1;
    })
  }

  useEffect(() => {
    const interval = setInterval(changeImage, 5000);
    return () => clearInterval(interval);
  }, [])

  return (
    <>
      {images.map((image, index) => (
        <LazyLoadingImage
          key={`loading-screen-image-${index}`}
          srcset={image.srcset}
          alt={image.alt}
          className={`loading-screen-image ${currentImage === index ? 'active' : ''}`}
        />
      ))}
    </>
  )
}

export default LoadingScreen;