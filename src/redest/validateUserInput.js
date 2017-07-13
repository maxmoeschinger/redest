const isObject = (a) => (!!a) && (a.constructor === Object);

const validate = (endpointWrapper) => {
    if (!Array.isArray(endpointWrapper)) {
        console.error('You must pass an array');
        return false;
    }
    for (let x = 0; x < endpointWrapper.length; x++) {
        const endpoint = endpointWrapper[x];
        if (!isObject(endpoint)) {
            console.error('Each endpoint must be an object');
            return false;
        }
        if (!endpoint.endpoint) {
            console.error('You must pass an endpoint name');
            return false;
        }
        if (!endpoint.select) {
            console.error('You must pass a select function');
            return false;
        }
        if (typeof endpoint.select !== 'function') {
            console.error('Select argument must be a function');
            return false;
        }
        if (endpoint.children) {
            return validate(endpoint.children);
        }
        return true;
    }
};

export default (userInput) => validate(userInput);