import {assessReleaseReadiness} from '../src/release/releaseReadiness.ts';
const result=assessReleaseReadiness();
console.log('Zalo Hub release readiness:',result.status);
console.log('Missing acceptance gates:',result.missing.join(', '));
console.log('Real Zalo integration:',result.cause);
console.log('Production push enabled:',result.liveFeaturesEnabled);
if (result.status !== 'blocked' || result.liveFeaturesEnabled) {
  throw new Error('Prototype must not become production-enabled through CI');
}
