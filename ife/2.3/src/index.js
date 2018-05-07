import san from 'san';
import {router} from 'san-router';
import San from './item2_3.san';

router.add({rule: '/', Component: San, target: '#app'});

router.start()



