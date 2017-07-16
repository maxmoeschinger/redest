import settings from '../settings';
import buildActions from './buildActions';

const build = (dataToRetrieve, redestState, dispatch, entities) => {

};

export default build;

const props = {
    service: {
        entities: [
            {
                id: 1,
                title: 123,
                endpoint: {
                    entities: [],
                    meta: {},
                    create: () => {}, // when you use this create it will automatically use the id of the parent service
                    invalidate: () => {}
                },
                update: () => {},
                remove: () => {},
                invalidate: () => {}
            }
        ],
        meta: {},
        create: () => {}, // when you use this create it will automatically use the id of the parent service
        invalidate: () => {}
    }
};

const store = {
    redest: {
        service: {
            entities: {},
            meta: {},
            children: {
                endpoint: {
                    entities: {},
                    meta: {}
                }
            }
        }
    }
};