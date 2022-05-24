import parameters from "./parameters";

export const defaultParameters = parameters.filter(title => !title.includes('/'));

