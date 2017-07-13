const isObject = (a) => (!!a) && (a.constructor === Object);

const validate = (endpointWrapper) => {
    if (!Array.isArray(endpointWrapper)) {
        console.error('You must pass an array');
        return;
    }
    endpointWrapper.forEach((endpoint) => {
        if (!isObject(endpoint)) {
            console.error('Each endpoint must be an object');
            return;
        }
        if (!endpoint.endpoint) {
            console.error('You must pass an endpoint name');
            return;
        }
        if (!endpoint.select) {
            console.error('You must pass a select function');
            return;
        }
        if (endpoint.children) {
            validate(endpoint.children);
        }
    });
};

export default (userInput) => validate(userInput);