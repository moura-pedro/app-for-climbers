import { Platform } from 'react-native';

// Import platform-specific implementations
import WebRouteMap from './RouteMap.web';
import NativeRouteMap from './RouteMap.native';

// Export the appropriate implementation based on platform
export default Platform.select({
  web: WebRouteMap,
  default: NativeRouteMap,
});