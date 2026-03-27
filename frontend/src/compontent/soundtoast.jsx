import { useToast } from "react-native-toast-notifications";
import Sound from "react-native-sound";


// ... inside a component ...
const toast = useToast();

const showToastWithSound = () => {
  // Play sound
  const sound = new Sound("whoosh.mp3", Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log("failed to load the sound", error);
      return;
    }
    
  // Sound loaded successfully
  console.log("Duration:", whoosh.getDuration(), "seconds");
  console.log("Channels:", whoosh.getNumberOfChannels());
    
  sound.play((success) => {
      if (success) {
        console.log("Successfully finished playing");
      }else {
      console.log("Playback failed due to audio decoding errors");
    }
      
      sound.release();
    });
  });

  // Show toast
  toast.show("Action completed!", { type: "success" });
};

export default showToastWithSound;