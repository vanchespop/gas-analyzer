import parameters from '../utils/parameters';

export const valueLimits = parameters.map(parameter => {
    const isRatio = parameter.includes('/');
    return {
        title: parameter,
        units: !isRatio ? parameter === 'Temperature' ? 'K' : 'ppm' : '',
        min: isRatio ? 0.001 : 1,
        max: 1000,
        step: isRatio ? 0.001 : 1,
        value: isRatio ? 0.5 : 500,
    }
});

