import { LogBox } from "react-native"

LogBox.ignoreAllLogs(true);

export {default as HomeScreen} from './home';
export {default as DetailsScreen} from './details';
export {default as Login} from './login/login';
export {default as Register} from './register/Register';
export {default as ChangeEntry} from './changeEntry';
export {default as RegisterAnimalScreen} from './register-animal';
export {default as AnimalProfileScreen} from './animalProfile';
export {default as AnimalsList} from './animalsList';
export {default as MyAnimalsList} from './myAnimalsList';
export {default as Notifications} from './notifications';
