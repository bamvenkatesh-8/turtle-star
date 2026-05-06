import imgWakeUp     from '../assets/task_images/wake_up.png'
import imgPrayTime   from '../assets/task_images/prayer_time.png'
import imgBrushTeeth from '../assets/task_images/brush_time.png'
import imgWashHands  from '../assets/task_images/hand_wash.png'
import imgGetDressed from '../assets/task_images/get_dressed.png'
import imgBreakfast  from '../assets/task_images/breakfast.png'
import imgTakeBath   from '../assets/task_images/bath_time.png'
import imgPajamas    from '../assets/task_images/pyjamas_time.png'
import imgPlayTime   from '../assets/task_images/play_time.png'
import imgReadBook   from '../assets/task_images/reading_time.png'
import imgLightsOut  from '../assets/task_images/sleep_time.png'
import imgSnack      from '../assets/task_images/snack_time.png'
import imgHomework   from '../assets/task_images/study_time.png'
import imgCleanToys  from '../assets/task_images/toys_clean_up.png'
// Uncomment as missing PNGs are added to src/assets/task_images/:
// import imgWashFace   from '../assets/task_images/wash_face.png'
import imgPackBag    from '../assets/task_images/pack_bag.png'
// import imgDrinkWater from '../assets/task_images/drink_water.png'
// import imgExercise   from '../assets/task_images/exercise.png'
// import imgBrushHair  from '../assets/task_images/brush_hair.png'
// import imgMakeBed    from '../assets/task_images/make_bed.png'
// import imgFeedPet    from '../assets/task_images/feed_pet.png'
// import imgTidyRoom   from '../assets/task_images/tidy_room.png'

const IMAGE_MAP = {
  'wake-up':        imgWakeUp,
  'pray-time':      imgPrayTime,
  'brush-teeth':    imgBrushTeeth,
  'wash-hands':     imgWashHands,
  'get-dressed':    imgGetDressed,
  'eat-breakfast':  imgBreakfast,
  'take-bath':      imgTakeBath,
  'put-on-pajamas': imgPajamas,
  'play-time':      imgPlayTime,
  'read-a-book':    imgReadBook,
  'lights-out':     imgLightsOut,
  'have-a-snack':   imgSnack,
  'do-homework':    imgHomework,
  'clean-up-toys':  imgCleanToys,
  // Uncomment as missing PNGs are added:
  // 'wash-face':   imgWashFace,
  'pack-bag':    imgPackBag,
  'eat-lunch':   imgBreakfast,
  'eat-dinner':  imgBreakfast,
  // 'drink-water': imgDrinkWater,
  // 'exercise':    imgExercise,
  // 'brush-hair':  imgBrushHair,
  // 'make-bed':    imgMakeBed,
  // 'feed-pet':    imgFeedPet,
  // 'tidy-room':   imgTidyRoom,
}

export default function TaskImage({ imageKey, className = '', objectFit = 'contain' }) {
  const src = IMAGE_MAP[imageKey]

  if (src) {
    return (
      <img
        src={src}
        alt={imageKey}
        className={`${objectFit === 'cover' ? 'object-cover' : 'object-contain'} ${className}`}
      />
    )
  }

  if (imageKey === 'placeholder') {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-gray-100 ${className}`}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-3/4 h-3/4">
          <circle cx="50" cy="50" r="35" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="3"/>
          <text x="30" y="62" fontSize="36">✓</text>
        </svg>
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center rounded-xl bg-gray-100 text-gray-400 text-2xl ${className}`}>
      ?
    </div>
  )
}
